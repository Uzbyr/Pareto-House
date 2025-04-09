
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/contexts/ProfileContext";
import { toast } from "sonner";
import SearchBar from "@/components/fellows/SearchBar";
import FellowList from "@/components/fellows/FellowList";
import { Fellow } from "@/types/fellow";

const FellowDirectory = () => {
  const [fellows, setFellows] = useState<Fellow[]>([]);
  const [filteredFellows, setFilteredFellows] = useState<Fellow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { profile } = useProfile();

  useEffect(() => {
    fetchFellows();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredFellows(fellows);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = fellows.filter(
        (fellow) =>
          fellow.first_name?.toLowerCase().includes(query) ||
          fellow.last_name?.toLowerCase().includes(query) ||
          fellow.university?.toLowerCase().includes(query) ||
          fellow.major?.toLowerCase().includes(query),
      );
      setFilteredFellows(filtered);
    }
  }, [searchQuery, fellows]);

  const fetchFellows = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("last_name", { ascending: true });

      if (error) {
        throw error;
      }

      const mappedData: Fellow[] = data.map(record => ({
        id: record.id,
        first_name: record.first_name,
        last_name: record.last_name,
        university: record.university,
        major: record.major,
        profile_picture_url: record.profile_picture_url,
        linkedin_url: record.linkedin_url,
        github_url: record.github_url,
        website_url: record.website_url
      }));

      setFellows(mappedData);
      setFilteredFellows(mappedData);
    } catch (error) {
      console.error("Error fetching fellows:", error);
      toast.error("Failed to load fellows directory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Fellows Directory</h1>
        <p className="text-gray-400 mt-2">
          Connect with other fellows in the Pareto community
        </p>
      </div>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FellowList fellows={filteredFellows} loading={loading} />
    </div>
  );
};

export default FellowDirectory;
