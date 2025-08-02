
-- Table T12 – levels
CREATE TABLE levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR UNIQUE NOT NULL,
    rank INTEGER UNIQUE NOT NULL,
    description TEXT,
    min_sales_count INTEGER DEFAULT 0,
    min_referrals_count INTEGER DEFAULT 0,
    commission_rate DECIMAL DEFAULT 0 CHECK (commission_rate >= 0),
    badge_url TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- Table T01 – users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR,
    phone_number VARCHAR UNIQUE,
    birth_date DATE UNIQUE,
    password TEXT,
    facebook_id VARCHAR UNIQUE,
    messenger_id VARCHAR UNIQUE,
    role VARCHAR NOT NULL CHECK (role IN ('client','advisor','admin')),
    referrer_id UUID REFERENCES users(id),
    level_id UUID REFERENCES levels(id),
    created_at TIMESTAMP DEFAULT now()
);

-- Table T02 – products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_code VARCHAR UNIQUE NOT NULL,
    lolly_name VARCHAR NOT NULL,
    inspired_name VARCHAR NOT NULL,
    inspired_brand VARCHAR NOT NULL,
    gender VARCHAR NOT NULL CHECK (gender IN ('male','female','unisex')),
    season VARCHAR,
    olfactory_family VARCHAR,
    top_notes TEXT,
    heart_notes TEXT,
    base_notes TEXT,
    description TEXT,
    image_url TEXT
);

-- Table T03 – product_variants
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id),
    volume_ml INTEGER NOT NULL CHECK (volume_ml > 0),
    price_tnd DECIMAL NOT NULL CHECK (price_tnd >= 0),
    stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
    variant_code VARCHAR UNIQUE NOT NULL
);

-- Table T04 – orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    advisor_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT now(),
    total_ht DECIMAL NOT NULL CHECK (total_ht >= 0),
    total_ttc DECIMAL NOT NULL CHECK (total_ttc >= 0),
    status VARCHAR NOT NULL CHECK (status IN ('pending','paid','cancelled'))
);

-- Table T05 – order_items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id),
    variant_id UUID NOT NULL REFERENCES product_variants(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL NOT NULL CHECK (unit_price >= 0)
);

-- Table T06 – favorites
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    product_id UUID NOT NULL REFERENCES products(id),
    created_at TIMESTAMP DEFAULT now(),
    UNIQUE(user_id, product_id)
);

-- Table T07 – promotions
CREATE TABLE promotions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    type VARCHAR NOT NULL CHECK (type IN ('discount','2+1','pack')),
    value DECIMAL NOT NULL CHECK (value >= 0),
    condition_json JSONB,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

-- Table T08 – promotion_products
CREATE TABLE promotion_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    promotion_id UUID NOT NULL REFERENCES promotions(id),
    product_id UUID NOT NULL REFERENCES products(id),
    created_at TIMESTAMP DEFAULT now()
);

-- Table T09 – commissions
CREATE TABLE commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_id UUID NOT NULL REFERENCES users(id),
    referee_id UUID NOT NULL REFERENCES users(id),
    order_id UUID NOT NULL REFERENCES orders(id),
    level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 3),
    amount DECIMAL NOT NULL CHECK (amount >= 0),
    created_at TIMESTAMP DEFAULT now()
);

-- Table T10 – commission_payments
CREATE TABLE commission_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_id UUID NOT NULL REFERENCES users(id),
    amount DECIMAL NOT NULL CHECK (amount >= 0),
    payment_date TIMESTAMP DEFAULT now(),
    payment_method VARCHAR,
    reference_code VARCHAR UNIQUE,
    note TEXT
);

-- Table T11 – commission_payment_items
CREATE TABLE commission_payment_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID NOT NULL REFERENCES commission_payments(id),
    commission_id UUID NOT NULL UNIQUE REFERENCES commissions(id),
    created_at TIMESTAMP DEFAULT now()
);

-- Table T13 – notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    title VARCHAR NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR NOT NULL CHECK (type IN ('info','alert','success','warning')),
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now()
);

-- Table T14 – admin_settings
CREATE TABLE admin_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    type VARCHAR NOT NULL CHECK (type IN ('int','decimal','boolean','text')),
    updated_at TIMESTAMP DEFAULT now()
);

-- Table T15 – custom_commission_rules
CREATE TABLE custom_commission_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 3),
    commission_rate DECIMAL NOT NULL CHECK (commission_rate >= 0),
    start_date DATE NOT NULL,
    end_date DATE,
    note TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- Table T16 – user_logs
CREATE TABLE user_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    action VARCHAR NOT NULL,
    details TEXT,
    ip_address VARCHAR,
    device VARCHAR,
    created_at TIMESTAMP DEFAULT now()
);
