import axios from "axios";

const prerelease = true;

export interface Version {
  version?: string;
  downloads?: number;
  id?: string;
}

export interface SearchResult {
  registration?: string;
  id: string;
  version?: string;
  description?: string;
  summary?: string;
  title?: string;
  licenseUrl?: string;
  tags?: string[];
  authors?: string[];
  totalDownloads?: number;
  verified?: boolean;
  versions?: Version[];
}

export async function nugetAutoComplete(
  packageId: string
): Promise<string[] | any> {
  const response = await axios.get(
    `https://api-v2v3search-0.nuget.org/autocomplete?q=${packageId}&prerelease=${prerelease.toString()}`
  );

  return response.data.data;
}

export async function nugetSearch(packageId: string): Promise<SearchResult> {
  const response = await axios.get(
    `https://api-v2v3search-0.nuget.org/query?q=${packageId}&prerelease=${prerelease.toString()}&take=1`
  );

  return response.data.data[0] as SearchResult;
}
