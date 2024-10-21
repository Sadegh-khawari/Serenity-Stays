import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qwvzcbjcjfwiysnpyple.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3dnpjYmpjamZ3aXlzbnB5cGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzMTQ1MzcsImV4cCI6MjA0Mzg5MDUzN30.QDvgVdjhrnjqcmx-7BzZmMoA64obXKIttT0cHYFEwjo";

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabaseUrl };
export default supabase;
