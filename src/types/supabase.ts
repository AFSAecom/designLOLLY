export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      admin_settings: {
        Row: {
          id: string;
          key: string;
          value: string;
          description: string | null;
          type: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          key: string;
          value: string;
          description?: string | null;
          type: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          key?: string;
          value?: string;
          description?: string | null;
          type?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      commission_payment_items: {
        Row: {
          id: string;
          payment_id: string;
          commission_id: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          payment_id: string;
          commission_id: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          payment_id?: string;
          commission_id?: string;
          created_at?: string | null;
        };
        Relationships: [];
      };
      commission_payments: {
        Row: {
          id: string;
          referrer_id: string;
          user_id: string;
          amount: number;
          payment_date: string | null;
          payment_method: string | null;
          reference_code: string | null;
          note: string | null;
        };
        Insert: {
          id?: string;
          referrer_id: string;
          user_id: string;
          amount: number;
          payment_date?: string | null;
          payment_method?: string | null;
          reference_code?: string | null;
          note?: string | null;
        };
        Update: {
          id?: string;
          referrer_id?: string;
          user_id?: string;
          amount?: number;
          payment_date?: string | null;
          payment_method?: string | null;
          reference_code?: string | null;
          note?: string | null;
        };
        Relationships: [];
      };
      commissions: {
        Row: {
          id: string;
          referrer_id: string;
          referee_id: string;
          order_id: string;
          level: number;
          amount: number;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          referrer_id: string;
          referee_id: string;
          order_id: string;
          level: number;
          amount: number;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          referrer_id?: string;
          referee_id?: string;
          order_id?: string;
          level?: number;
          amount?: number;
          created_at?: string | null;
        };
        Relationships: [];
      };
      custom_commission_rules: {
        Row: {
          id: string;
          user_id: string;
          level: number;
          commission_rate: number;
          start_date: string;
          end_date: string | null;
          note: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          level: number;
          commission_rate: number;
          start_date: string;
          end_date?: string | null;
          note?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          level?: number;
          commission_rate?: number;
          start_date?: string;
          end_date?: string | null;
          note?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          created_at?: string | null;
        };
        Relationships: [];
      };
      levels: {
        Row: {
          id: string;
          name: string;
          rank: number;
          description: string | null;
          min_sales_count: number | null;
          min_referrals_count: number | null;
          commission_rate: number | null;
          badge_url: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          rank: number;
          description?: string | null;
          min_sales_count?: number | null;
          min_referrals_count?: number | null;
          commission_rate?: number | null;
          badge_url?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          rank?: number;
          description?: string | null;
          min_sales_count?: number | null;
          min_referrals_count?: number | null;
          commission_rate?: number | null;
          badge_url?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          read: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          read?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: string;
          read?: boolean | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          variant_id: string;
          quantity: number;
          unit_price: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          variant_id: string;
          quantity: number;
          unit_price: number;
        };
        Update: {
          id?: string;
          order_id?: string;
          variant_id?: string;
          quantity?: number;
          unit_price?: number;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          advisor_id: string | null;
          created_at: string | null;
          total_ht: number;
          total_ttc: number;
          status: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          advisor_id?: string | null;
          created_at?: string | null;
          total_ht: number;
          total_ttc: number;
          status: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          advisor_id?: string | null;
          created_at?: string | null;
          total_ht?: number;
          total_ttc?: number;
          status?: string;
        };
        Relationships: [];
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          volume_ml: number;
          price_tnd: number;
          stock_quantity: number | null;
          variant_code: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          volume_ml: number;
          price_tnd: number;
          stock_quantity?: number | null;
          variant_code: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          volume_ml?: number;
          price_tnd?: number;
          stock_quantity?: number | null;
          variant_code?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          product_code: string;
          lolly_name: string;
          inspired_name: string;
          inspired_brand: string;
          gender: string;
          season: string | null;
          olfactory_family: string | null;
          top_notes: string | null;
          heart_notes: string | null;
          base_notes: string | null;
          description: string | null;
          image_url: string | null;
        };
        Insert: {
          id?: string;
          product_code: string;
          lolly_name: string;
          inspired_name: string;
          inspired_brand: string;
          gender: string;
          season?: string | null;
          olfactory_family?: string | null;
          top_notes?: string | null;
          heart_notes?: string | null;
          base_notes?: string | null;
          description?: string | null;
          image_url?: string | null;
        };
        Update: {
          id?: string;
          product_code?: string;
          lolly_name?: string;
          inspired_name?: string;
          inspired_brand?: string;
          gender?: string;
          season?: string | null;
          olfactory_family?: string | null;
          top_notes?: string | null;
          heart_notes?: string | null;
          base_notes?: string | null;
          description?: string | null;
          image_url?: string | null;
        };
        Relationships: [];
      };
      promotion_products: {
        Row: {
          id: string;
          promotion_id: string;
          product_id: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          promotion_id: string;
          product_id: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          promotion_id?: string;
          product_id?: string;
          created_at?: string | null;
        };
        Relationships: [];
      };
      promotions: {
        Row: {
          id: string;
          name: string;
          type: string;
          value: number;
          condition_json: Json | null;
          start_date: string;
          end_date: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          type: string;
          value: number;
          condition_json?: Json | null;
          start_date: string;
          end_date: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string;
          value?: number;
          condition_json?: Json | null;
          start_date?: string;
          end_date?: string;
          created_at?: string | null;
        };
        Relationships: [];
      };
      user_logs: {
        Row: {
          id: string;
          user_id: string;
          action: string;
          details: string | null;
          ip_address: string | null;
          device: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          action: string;
          details?: string | null;
          ip_address?: string | null;
          device?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          action?: string;
          details?: string | null;
          ip_address?: string | null;
          device?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string | null;
          phone_number: string | null;
          birth_date: string | null;
          password: string | null;
          facebook_id: string | null;
          messenger_id: string | null;
          role: string;
          referrer_id: string | null;
          level_id: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          email?: string | null;
          phone_number?: string | null;
          birth_date?: string | null;
          password?: string | null;
          facebook_id?: string | null;
          messenger_id?: string | null;
          role: string;
          referrer_id?: string | null;
          level_id?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          email?: string | null;
          phone_number?: string | null;
          birth_date?: string | null;
          password?: string | null;
          facebook_id?: string | null;
          messenger_id?: string | null;
          role?: string;
          referrer_id?: string | null;
          level_id?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
