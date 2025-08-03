-- Table: admin_settings
CREATE TABLE IF NOT EXISTS admin_settings (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    key character varying NOT NULL,
    value text NOT NULL,
    description text,
    type character varying NOT NULL,
    updated_at timestamp without time zone DEFAULT now()
);

-- Table: commission_payment_items
CREATE TABLE IF NOT EXISTS commission_payment_items (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    payment_id uuid NOT NULL,
    commission_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);

-- Table: commission_payments
CREATE TABLE IF NOT EXISTS commission_payments (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    referrer_id uuid NOT NULL,
    user_id uuid NOT NULL,
    amount numeric NOT NULL,
    payment_date timestamp without time zone DEFAULT now(),
    payment_method character varying,
    reference_code character varying,
    note text
);

-- Table: commissions
CREATE TABLE IF NOT EXISTS commissions (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    referrer_id uuid NOT NULL,
    referee_id uuid NOT NULL,
    order_id uuid NOT NULL,
    level integer NOT NULL,
    amount numeric NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);

-- Table: custom_commission_rules
CREATE TABLE IF NOT EXISTS custom_commission_rules (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    level integer NOT NULL,
    commission_rate numeric NOT NULL,
    start_date date NOT NULL,
    end_date date,
    note text,
    created_at timestamp without time zone DEFAULT now()
);

-- Table: favorites
CREATE TABLE IF NOT EXISTS favorites (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    product_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);

-- Table: levels
CREATE TABLE IF NOT EXISTS levels (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying NOT NULL,
    rank integer NOT NULL,
    description text,
    min_sales_count integer DEFAULT 0,
    min_referrals_count integer DEFAULT 0,
    commission_rate numeric DEFAULT 0,
    badge_url text,
    created_at timestamp without time zone DEFAULT now()
);

-- Table: notifications
CREATE TABLE IF NOT EXISTS notifications (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    title character varying NOT NULL,
    message text NOT NULL,
    type character varying NOT NULL,
    read boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now()
);

-- Table: order_items
CREATE TABLE IF NOT EXISTS order_items (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    order_id uuid NOT NULL,
    variant_id uuid NOT NULL,
    quantity integer NOT NULL,
    unit_price numeric NOT NULL
);

-- Table: orders
CREATE TABLE IF NOT EXISTS orders (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    advisor_id uuid,
    created_at timestamp without time zone DEFAULT now(),
    total_ht numeric NOT NULL,
    total_ttc numeric NOT NULL,
    status character varying NOT NULL
);

-- Table: product_variants
CREATE TABLE IF NOT EXISTS product_variants (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    product_id uuid NOT NULL,
    volume_ml integer NOT NULL,
    price_tnd numeric NOT NULL,
    stock_quantity integer DEFAULT 0,
    variant_code character varying NOT NULL
);

-- Table: products
CREATE TABLE IF NOT EXISTS products (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    product_code character varying NOT NULL,
    lolly_name character varying NOT NULL,
    inspired_name character varying NOT NULL,
    inspired_brand character varying NOT NULL,
    gender character varying NOT NULL,
    season character varying,
    olfactory_family character varying,
    top_notes text,
    heart_notes text,
    base_notes text,
    description text,
    image_url text
);

-- Table: promotion_products
CREATE TABLE IF NOT EXISTS promotion_products (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    promotion_id uuid NOT NULL,
    product_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);

-- Table: promotions
CREATE TABLE IF NOT EXISTS promotions (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying NOT NULL,
    type character varying NOT NULL,
    value numeric NOT NULL,
    condition_json jsonb,
    start_date date NOT NULL,
    end_date date NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);

-- Table: user_logs
CREATE TABLE IF NOT EXISTS user_logs (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    action character varying NOT NULL,
    details text,
    ip_address character varying,
    device character varying,
    created_at timestamp without time zone DEFAULT now()
);

-- Table: users
CREATE TABLE IF NOT EXISTS users (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying,
    phone_number character varying,
    birth_date date,
    password text,
    facebook_id character varying,
    messenger_id character varying,
    role character varying NOT NULL,
    referrer_id uuid,
    level_id uuid,
    created_at timestamp without time zone DEFAULT now()
);
