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

export async function fetchSignals() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  if (error || !data || data.length === 0) {
    return [
      {
        id: 1,
        type: 'HIGH_SIGNAL',
        content: 'Whale accumulation detected on PEPE',
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        type: 'SOCIAL',
        content: 'Token trending on Twitter',
        created_at: new Date().toISOString(),
      },
    ];
  }

  return data;
}

export async function getMarketOverview() {
  return {
    total_tokens: 12,
    active_signals: 3,
    volume: 0,
  };
}
