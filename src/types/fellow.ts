
export interface Fellow {
  id: string;
  first_name: string | null;
  last_name: string | null;
  university: string | null;
  high_school: string | null;
  major: string | null;
  graduation_year: string | null;
  profile_picture_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  website_url: string | null;
  about: string | null;
  competition_results: string | null;
  competitive_profiles: string[] | null;
  video_url: string | null;
  x_url: string | null;
  nationality: string | null;
}
