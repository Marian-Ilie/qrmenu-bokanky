import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        // Interogare minimă pentru a menține baza de date activă
        const { data, error } = await supabase
            .from('categories')
            .select('id')
            .limit(1);

        if (error) throw error;

        return NextResponse.json({
            status: 'ok',
            message: 'Supabase is awake',
            time: new Date().toISOString()
        });
    } catch (error) {
        console.error('Keep-alive ping failed:', error);
        return NextResponse.json(
            { status: 'error', message: 'Failed to ping DB' },
            { status: 500 }
        );
    }
}