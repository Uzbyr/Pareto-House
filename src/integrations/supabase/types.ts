export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          building_company: string;
          category_of_interest: string | null;
          company_context: string | null;
          competition_results: string | null;
          competitive_profiles: string[] | null;
          country: string;
          deck_file: string | null;
          education_level: string;
          email: string;
          first_name: string;
          flagged: boolean | null;
          github_url: string | null;
          graduation_year: string;
          has_competition_experience: string | null;
          high_school: string | null;
          id: string;
          last_name: string;
          linkedin_url: string | null;
          major: string | null;
          memo_file: string | null;
          nationality: string;
          preparatory_classes: string | null;
          resume_file: string | null;
          status: string;
          student_societies: string | null;
          submission_date: string;
          university: string | null;
          video_url: string | null;
          website_url: string | null;
          x_url: string | null;
        };
        Insert: {
          building_company: string;
          category_of_interest?: string | null;
          company_context?: string | null;
          competition_results?: string | null;
          competitive_profiles?: string[] | null;
          country: string;
          deck_file?: string | null;
          education_level?: string;
          email: string;
          first_name: string;
          flagged?: boolean | null;
          github_url?: string | null;
          graduation_year: string;
          has_competition_experience?: string | null;
          high_school?: string | null;
          id?: string;
          last_name: string;
          linkedin_url?: string | null;
          major?: string | null;
          memo_file?: string | null;
          nationality: string;
          preparatory_classes?: string | null;
          resume_file?: string | null;
          status?: string;
          student_societies?: string | null;
          submission_date?: string;
          university?: string | null;
          video_url?: string | null;
          website_url?: string | null;
          x_url?: string | null;
        };
        Update: {
          building_company?: string;
          category_of_interest?: string | null;
          company_context?: string | null;
          competition_results?: string | null;
          competitive_profiles?: string[] | null;
          country?: string;
          deck_file?: string | null;
          education_level?: string;
          email?: string;
          first_name?: string;
          flagged?: boolean | null;
          github_url?: string | null;
          graduation_year?: string;
          has_competition_experience?: string | null;
          high_school?: string | null;
          id?: string;
          last_name?: string;
          linkedin_url?: string | null;
          major?: string | null;
          memo_file?: string | null;
          nationality?: string;
          preparatory_classes?: string | null;
          resume_file?: string | null;
          status?: string;
          student_societies?: string | null;
          submission_date?: string;
          university?: string | null;
          video_url?: string | null;
          website_url?: string | null;
          x_url?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          building_company: string;
          category_of_interest: string | null;
          company_context: string | null;
          competition_results: string | null;
          competitive_profiles: string[] | null;
          country: string;
          deck_file: string | null;
          education_level: string;
          email: string;
          first_name: string;
          github_url: string | null;
          graduation_year: string;
          has_competition_experience: string | null;
          high_school: string | null;
          id: string;
          last_name: string;
          linkedin_url: string | null;
          major: string | null;
          memo_file: string | null;
          nationality: string;
          preparatory_classes: string | null;
          profile_picture_url: string | null;
          resume_file: string | null;
          status: string;
          student_societies: string | null;
          university: string | null;
          user_id: string;
          video_url: string | null;
          website_url: string | null;
          x_url: string | null;
          onboarding_completed: boolean;
        };
        Insert: {};
        Update: {
          building_company: string;
          category_of_interest: string | null;
          company_context: string | null;
          competition_results: string | null;
          competitive_profiles: string[] | null;
          country: string;
          deck_file: string | null;
          education_level: string;
          email: string;
          first_name: string;
          github_url: string | null;
          graduation_year: string;
          has_competition_experience: string | null;
          high_school: string | null;
          id: string;
          last_name: string;
          linkedin_url: string | null;
          major: string | null;
          memo_file: string | null;
          nationality: string;
          preparatory_classes: string | null;
          profile_picture_url: string | null;
          resume_file: string | null;
          status: string;
          student_societies: string | null;
          university: string | null;
          video_url: string | null;
          website_url: string | null;
          x_url: string | null;
          onboarding_completed: boolean;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          cohort: string | null;
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["user_role"];
          user_id: string;
        };
        Insert: {
          cohort?: string | null;
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["user_role"];
          user_id: string;
        };
        Update: {
          cohort?: string | null;
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["user_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_user_roles: {
        Args: { _user_id: string };
        Returns: Database["public"]["Enums"]["user_role"][];
      };
      has_role: {
        Args: {
          _user_id: string;
          _role: Database["public"]["Enums"]["user_role"];
        };
        Returns: boolean;
      };
    };
    Enums: {
      user_role: "fellow" | "alumni" | "admin";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      user_role: ["fellow", "alumni", "admin"],
    },
  },
} as const;
