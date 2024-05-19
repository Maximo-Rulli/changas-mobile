import supabase from '../libs/supabase/server';
import bcrypt from '../bcryptSetup';
import messages from '../utils/messages';

export default async function AuthLogin(email, password){
    const { data, error} = await supabase.from('users').select('*').eq('email', email).single();
    
    if (error) {
        console.log(error)
        throw new Error(messages.error.error);
    }
    if (!data) {
        throw new Error(messages.error.user_not_found);
    }
    const validPassword = await bcrypt.compare(password, data.password)

    if (validPassword) {
        return data;
    }
    else {
        throw new Error(messages.error.incorrect_password);
    }

}