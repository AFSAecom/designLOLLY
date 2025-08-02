
-- LEVELS (Lolly Forest + seed/branch tiers)
INSERT INTO levels (id, name, rank, description, min_sales_count, min_referrals_count, commission_rate, badge_url, created_at) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Lolly Seed I', 1, 'Départ', 0, 0, 0.05, 'seed1.png', now()),
  ('00000000-0000-0000-0000-000000000002', 'Lolly Seed II', 2, 'Progression', 3, 1, 0.06, 'seed2.png', now()),
  ('00000000-0000-0000-0000-000000000003', 'Lolly Seed III', 3, 'Confirmé', 5, 2, 0.07, 'seed3.png', now()),
  ('00000000-0000-0000-0000-000000000004', 'Lolly Branch I', 4, 'Niveau Branch débutant', 8, 3, 0.08, 'branch1.png', now()),
  ('00000000-0000-0000-0000-000000000005', 'Lolly Branch II', 5, 'Niveau Branch avancé', 12, 5, 0.09, 'branch2.png', now()),
  ('00000000-0000-0000-0000-000000000006', 'Lolly Tree', 6, 'Niveau arbre atteint', 20, 7, 0.10, 'tree.png', now());

-- USERS: 3 clients, 2 conseillères, 1 admin
INSERT INTO users (id, first_name, last_name, email, phone_number, birth_date, password, role, referrer_id, level_id, facebook_id, messenger_id, created_at) VALUES
  ('11111111-0000-0000-0000-000000000001', 'Alpha', 'Client', 'alpha@lolly.com', '1234567890', '1990-01-01', 'hashedpass1', 'client', NULL, '00000000-0000-0000-0000-000000000001', NULL, NULL, now()),
  ('11111111-0000-0000-0000-000000000002', 'Beta', 'Client', 'beta@lolly.com', '1234567891', '1991-02-02', 'hashedpass2', 'client', '11111111-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', NULL, NULL, now()),
  ('11111111-0000-0000-0000-000000000003', 'Gamma', 'Client', 'gamma@lolly.com', '1234567892', '1992-03-03', 'hashedpass3', 'client', '11111111-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000004', NULL, NULL, now()),
  ('11111111-0000-0000-0000-000000000004', 'Lila', 'Conseillère', 'lila@lolly.com', '1234567893', '1985-04-04', 'hashedpass4', 'advisor', NULL, '00000000-0000-0000-0000-000000000003', NULL, NULL, now()),
  ('11111111-0000-0000-0000-000000000005', 'Nour', 'Conseillère', 'nour@lolly.com', '1234567894', '1986-05-05', 'hashedpass5', 'advisor', NULL, '00000000-0000-0000-0000-000000000005', NULL, NULL, now()),
  ('11111111-0000-0000-0000-000000000099', 'Admin', 'Lolly', 'admin@lolly.com', '1234567899', '1980-12-12', 'hashedadmin', 'admin', NULL, '00000000-0000-0000-0000-000000000006', NULL, NULL, now());

-- PRODUCTS + VARIANTS
INSERT INTO products (id, product_code, lolly_name, inspired_name, inspired_brand, gender, season, olfactory_family, top_notes, heart_notes, base_notes, description, image_url) VALUES
  ('22222222-0000-0000-0000-000000000001', 'P001', 'Éclat Floral', 'J’adore', 'Dior', 'female', 'spring', 'Florale', 'Neroli', 'Rose', 'Vanille', 'Lumineux et féminin', 'eclat.jpg'),
  ('22222222-0000-0000-0000-000000000002', 'P002', 'Bois Intense', 'Sauvage', 'Dior', 'male', 'winter', 'Boisée', 'Bergamote', 'Ambroxan', 'Cèdre', 'Puissant et masculin', 'bois.jpg'),
  ('22222222-0000-0000-0000-000000000003', 'P003', 'Velours Epicé', 'Spicebomb', 'V&R', 'male', 'fall', 'Epicée', 'Cannelle', 'Tabac', 'Cuir', 'Chaud et envoûtant', 'epice.jpg'),
  ('22222222-0000-0000-0000-000000000004', 'P004', 'Douceur Sucrée', 'La Vie est Belle', 'Lancôme', 'female', 'winter', 'Gourmand', 'Poire', 'Iris', 'Praline', 'Douce et addictive', 'douce.jpg'),
  ('22222222-0000-0000-0000-000000000005', 'P005', 'Fraîcheur Marine', 'Aqua di Gio', 'Armani', 'male', 'summer', 'Aquatique', 'Citron', 'Algues', 'Musc', 'Frais et revigorant', 'marine.jpg'),
  ('22222222-0000-0000-0000-000000000006', 'P006', 'Nuit Mystérieuse', 'Black Opium', 'YSL', 'female', 'night', 'Orientale', 'Poivre rose', 'Café', 'Bois blanc', 'Mystérieux et vibrant', 'nuit.jpg');

INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES
  (gen_random_uuid(), '22222222-0000-0000-0000-000000000001', 50, 59.9, 100, 'P001-V1'),
  (gen_random_uuid(), '22222222-0000-0000-0000-000000000002', 50, 59.9, 100, 'P002-V1'),
  (gen_random_uuid(), '22222222-0000-0000-0000-000000000003', 50, 59.9, 100, 'P003-V1'),
  (gen_random_uuid(), '22222222-0000-0000-0000-000000000004', 50, 59.9, 100, 'P004-V1'),
  (gen_random_uuid(), '22222222-0000-0000-0000-000000000005', 50, 59.9, 100, 'P005-V1'),
  (gen_random_uuid(), '22222222-0000-0000-0000-000000000006', 50, 59.9, 100, 'P006-V1');

-- PROMOTION appliquée à 1 parfum
INSERT INTO promotions (id, name, type, value, condition_json, start_date, end_date, created_at) VALUES
  ('33333333-0000-0000-0000-000000000001', 'Lancement Été', 'discount', 20, '{"discount":20}', '2025-07-01', '2025-08-31', now());

INSERT INTO promotion_products (id, promotion_id, product_id, created_at) VALUES
  (gen_random_uuid(), '33333333-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000001', now());

-- COMMANDES
INSERT INTO orders (id, user_id, advisor_id, status, total_ht, total_ttc, created_at) VALUES
  ('44444444-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000004', 'paid', 50.0, 59.9, now()),
  ('44444444-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000004', 'paid', 100.0, 119.8, now()),
  ('44444444-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000005', 'paid', 150.0, 179.7, now());

-- ORDER ITEMS
INSERT INTO order_items (id, order_id, variant_id, quantity, unit_price)
SELECT gen_random_uuid(), '44444444-0000-0000-0000-000000000001', id, 1, 59.9 FROM product_variants LIMIT 1;
INSERT INTO order_items (id, order_id, variant_id, quantity, unit_price)
SELECT gen_random_uuid(), '44444444-0000-0000-0000-000000000002', id, 2, 59.9 FROM product_variants OFFSET 1 LIMIT 1;
INSERT INTO order_items (id, order_id, variant_id, quantity, unit_price)
SELECT gen_random_uuid(), '44444444-0000-0000-0000-000000000003', id, 3, 59.9 FROM product_variants OFFSET 2 LIMIT 1;

-- COMMISSIONS
INSERT INTO commissions (id, referrer_id, referee_id, order_id, level, amount, created_at) VALUES
  ('55555555-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000004', '11111111-0000-0000-0000-000000000001', '44444444-0000-0000-0000-000000000001', 1, 5.99, now()),
  ('55555555-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000004', '11111111-0000-0000-0000-000000000002', '44444444-0000-0000-0000-000000000002', 1, 11.98, now()),
  ('55555555-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000005', '11111111-0000-0000-0000-000000000003', '44444444-0000-0000-0000-000000000003', 1, 17.97, now());

-- NOTIFICATION DE BIENVENUE
INSERT INTO notifications (id, user_id, title, message, type, read, created_at)
VALUES (gen_random_uuid(), '11111111-0000-0000-0000-000000000001', 'Bienvenue !', 'Merci d’avoir rejoint Lolly !', 'info', false, now());
