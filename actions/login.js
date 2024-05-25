import supabase from '../libs/supabase/server';
import bcrypt from '../bcryptSetup';
import messages from '../utils/messages';
import * as SecureStore from 'expo-secure-store';

export default async function AuthLogin(email, password){
    const { data, error} = await supabase.from('users').select('*').eq('email', email).single();
    
    if (error) {
        throw new Error(messages.error.error);
    }
    if (!data) {
        throw new Error(messages.error.user_not_found);
    }
    const validPassword = await bcrypt.compare(password, data.password);

    if (validPassword) {
        const { data: userdata, error: usererror} = await supabase.from('users_data').select('name, surname').eq('email', email).single();
        const username = userdata.name + ' ' + userdata.surname;

        if (!usererror){
            // Save the data to secure store
            await SecureStore.setItemAsync('id_user', data.id_user);
            await SecureStore.setItemAsync('username', username);
            return true;
        }
        else {
            throw new Error(messages.error.error);
        }
    }
    else {
        throw new Error(messages.error.incorrect_password);
    }

}