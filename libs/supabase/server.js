import { createClient } from '@supabase/supabase-js';
import {NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY} from '@env';

const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY)

export default supabase