import { supabase } from './db';

type TokenInput = {
  name: string;
  symbol: string;
  owner_username: string;
  contract_address: string;
  website?: string;
  twitter?: string;
};

export async function submitToken(tokenData: TokenInput) {
  const { error } = await supabase
    .from('tokens')
    .insert([{
      name: tokenData.name,
      symbol: tokenData.symbol,
      ticker: tokenData.symbol,
      owner_username: tokenData.owner_username,
      contract_address: tokenData.contract_address,
      website: tokenData.website ?? null,
      twitter_url: tokenData.twitter ?? null,
      created_at: new Date().toISOString(),
    }]);

  if (error) throw error;
}

export async function fetchMyTokens(username: string) {
  const { data, error } = await supabase
    .from('tokens')
    .select('*')
    .eq('owner_username', username.trim().toLowerCase())
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getMarketOverview() {
  return {
    total_tokens: 0,
    trending: [],
    volume: 0,
  };
}
