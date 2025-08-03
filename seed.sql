INSERT INTO users (
        id, first_name, last_name, email, phone_number, birth_date, password, role,
        facebook_id, messenger_id, referrer_id, level_id
    ) VALUES (
        '3bfdd533-35db-47ca-924d-5f333017a45b', 'User0', 'Test0', 'user0@lolly.tn',
        '555000000', '1990-01-01', 'hashed_password', 'client',
        'fb_user0', 'msg_user0', NULL,
        NULL
    );
INSERT INTO users (
        id, first_name, last_name, email, phone_number, birth_date, password, role,
        facebook_id, messenger_id, referrer_id, level_id
    ) VALUES (
        '249cb10a-e08e-4481-ad36-2a65760d17be', 'User1', 'Test1', 'user1@lolly.tn',
        '555000001', '1991-01-01', 'hashed_password', 'client',
        'fb_user1', 'msg_user1', NULL,
        NULL
    );
INSERT INTO users (
        id, first_name, last_name, email, phone_number, birth_date, password, role,
        facebook_id, messenger_id, referrer_id, level_id
    ) VALUES (
        '9f1c8ced-4af0-48ce-9574-ffa587d16ac8', 'User2', 'Test2', 'user2@lolly.tn',
        '555000002', '1992-01-01', 'hashed_password', 'client',
        'fb_user2', 'msg_user2', NULL,
        NULL
    );
INSERT INTO users (
        id, first_name, last_name, email, phone_number, birth_date, password, role,
        facebook_id, messenger_id, referrer_id, level_id
    ) VALUES (
        '33654191-dd0c-4390-ba59-04ea4049ead6', 'User3', 'Test3', 'user3@lolly.tn',
        '555000003', '1993-01-01', 'hashed_password', 'advisor',
        'fb_user3', 'msg_user3', NULL,
        NULL
    );
INSERT INTO users (
        id, first_name, last_name, email, phone_number, birth_date, password, role,
        facebook_id, messenger_id, referrer_id, level_id
    ) VALUES (
        '1692daee-40b4-4631-9b2c-f1e2600e46cd', 'User4', 'Test4', 'user4@lolly.tn',
        '555000004', '1994-01-01', 'hashed_password', 'advisor',
        'fb_user4', 'msg_user4', NULL,
        NULL
    );
INSERT INTO users (
        id, first_name, last_name, email, phone_number, birth_date, password, role,
        facebook_id, messenger_id, referrer_id, level_id
    ) VALUES (
        'b33ac5c6-fccf-4a9a-8776-43f99164f46a', 'User5', 'Test5', 'user5@lolly.tn',
        '555000005', '1995-01-01', 'hashed_password', 'admin',
        'fb_user5', 'msg_user5', NULL,
        NULL
    );
INSERT INTO levels (id, name, rank, commission_rate) VALUES ('5f8ef4e0-aff3-4172-88f1-32f433267a87', 'Lolly Seed', 1, 0.05);
INSERT INTO levels (id, name, rank, commission_rate) VALUES ('75a523c4-da9e-4dac-a789-e4cca698df44', 'Lolly Sprout', 2, 0.08);
INSERT INTO levels (id, name, rank, commission_rate) VALUES ('d2262907-0a75-4921-91e1-bb7edcd80bed', 'Lolly Branch', 3, 0.11);
INSERT INTO levels (id, name, rank, commission_rate) VALUES ('2846607e-c9fd-4cc9-83e5-06bbd36caf1f', 'Lolly Tree', 4, 0.14);
INSERT INTO levels (id, name, rank, commission_rate) VALUES ('9d0d59a8-3b39-4a17-a250-4069cbe6b188', 'Lolly Star', 5, 0.17);
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('ed3eb2bc-6ab5-482d-b4d9-9873a981c0ce', '2083a384-efa7-4712-8338-5f9c4a015ea9', 15, 44.15, 89, 'P001-15');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('d57f996c-7cf7-4825-9a64-b0d110d1414d', '2083a384-efa7-4712-8338-5f9c4a015ea9', 30, 58.4, 46, 'P001-30');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('ddb4a11e-3c13-40e7-9802-b5690a5358c2', '2083a384-efa7-4712-8338-5f9c4a015ea9', 50, 77.4, 66, 'P001-50');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('5586debc-eb2f-4ac8-a4f3-5f6860636c75', '2083a384-efa7-4712-8338-5f9c4a015ea9', 100, 124.9, 73, 'P001-100');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('aa7d8f03-013e-43db-b65d-cdfde2299c98', 'c3a0a2d8-8499-4305-b0c0-f6830d71c654', 15, 44.15, 57, 'P002-15');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('92d16822-b454-415d-9681-0c4abf798914', 'c3a0a2d8-8499-4305-b0c0-f6830d71c654', 30, 58.4, 93, 'P002-30');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('4bf4d20e-7209-41d7-ae50-fc21aa3d3a5f', 'c3a0a2d8-8499-4305-b0c0-f6830d71c654', 50, 77.4, 83, 'P002-50');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('fd8e4556-4d6e-45ce-89a8-53f4a97ab8c4', 'c3a0a2d8-8499-4305-b0c0-f6830d71c654', 100, 124.9, 78, 'P002-100');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('6f18bc1a-3cf2-45b6-8126-7be3d7375f52', '12dabb0b-fe06-498e-bb2d-7c30fc3a085a', 15, 44.15, 33, 'P003-15');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('4e492c8d-9bcc-446b-9577-ae68da48f64a', '12dabb0b-fe06-498e-bb2d-7c30fc3a085a', 30, 58.4, 34, 'P003-30');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('8a6f0744-454e-4e75-891e-a05e0b342b6e', '12dabb0b-fe06-498e-bb2d-7c30fc3a085a', 50, 77.4, 75, 'P003-50');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('fe20b8e7-009c-4b34-bf20-dadd84b7d0c7', '12dabb0b-fe06-498e-bb2d-7c30fc3a085a', 100, 124.9, 10, 'P003-100');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('aebe947d-c2ae-4d03-9105-67c6385a55fd', 'bb10882e-d768-4155-9779-8d6fee3bf4fd', 15, 44.15, 53, 'P004-15');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('0dcc469d-8a12-4316-873b-9f159ec5f6ba', 'bb10882e-d768-4155-9779-8d6fee3bf4fd', 30, 58.4, 51, 'P004-30');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('ad4d757e-43aa-47be-b7a3-4344ef2c3abd', 'bb10882e-d768-4155-9779-8d6fee3bf4fd', 50, 77.4, 26, 'P004-50');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('c731997c-3898-4ffc-9a8b-a3ee3f087e1b', 'bb10882e-d768-4155-9779-8d6fee3bf4fd', 100, 124.9, 44, 'P004-100');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('8c6bdf47-e146-4878-b3dd-76eb41e89e86', '3f11a1ab-2241-4466-b14e-53acfd4755fd', 15, 44.15, 44, 'P005-15');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('7f98a782-547b-4f1e-83ee-9c80de915958', '3f11a1ab-2241-4466-b14e-53acfd4755fd', 30, 58.4, 88, 'P005-30');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('44b91e7c-2380-4339-ac54-b7e929200074', '3f11a1ab-2241-4466-b14e-53acfd4755fd', 50, 77.4, 52, 'P005-50');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('ab60db2f-534c-47ce-9a9f-3b2ce5701b46', '3f11a1ab-2241-4466-b14e-53acfd4755fd', 100, 124.9, 44, 'P005-100');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('b9807092-6c5b-4a1f-bfa6-b274913f6145', 'd11fc311-72a9-4c9d-83a0-e6c4540fdf9f', 15, 44.15, 97, 'P006-15');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('49c3e6cc-7aab-49c8-9a9f-30082ceca811', 'd11fc311-72a9-4c9d-83a0-e6c4540fdf9f', 30, 58.4, 43, 'P006-30');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('6195650c-b0ab-4cb7-bddc-77c1fd09dc82', 'd11fc311-72a9-4c9d-83a0-e6c4540fdf9f', 50, 77.4, 41, 'P006-50');
INSERT INTO product_variants (id, product_id, volume_ml, price_tnd, stock_quantity, variant_code) VALUES ('6e36b0b7-0384-4f00-ba7f-42afe41d4657', 'd11fc311-72a9-4c9d-83a0-e6c4540fdf9f', 100, 124.9, 16, 'P006-100');
INSERT INTO orders (id, user_id, total_ht, total_ttc, status) VALUES ('e21d6cc5-75c7-472f-aabf-c405626a9b69', 'aeb29974-f6e3-465b-b25e-eb21100cf748', 79.9, 89.9, 'paid');
INSERT INTO orders (id, user_id, total_ht, total_ttc, status) VALUES ('54c0f6e0-3c18-49b2-9dbb-c303ce25298f', 'aeb29974-f6e3-465b-b25e-eb21100cf748', 79.9, 89.9, 'paid');
INSERT INTO orders (id, user_id, total_ht, total_ttc, status) VALUES ('ca865576-94ca-4fe1-8fab-2ad1d7b5a71c', '80a26558-6698-49af-a5df-a24b47bddbec', 79.9, 89.9, 'paid');
INSERT INTO orders (id, user_id, total_ht, total_ttc, status) VALUES ('7b75d244-cb10-4af1-aa46-d1dc0b21192b', '80a26558-6698-49af-a5df-a24b47bddbec', 79.9, 89.9, 'paid');
INSERT INTO orders (id, user_id, total_ht, total_ttc, status) VALUES ('497170bf-770c-4c63-9cc6-32a4b32f9abd', '62ddc063-abe0-4bb3-82cb-ef85c2fcd98f', 79.9, 89.9, 'paid');
INSERT INTO orders (id, user_id, total_ht, total_ttc, status) VALUES ('fb3058b3-be25-4551-8b77-93966807c60c', '62ddc063-abe0-4bb3-82cb-ef85c2fcd98f', 79.9, 89.9, 'paid');
INSERT INTO order_items (id, order_id, variant_id, quantity, unit_price) VALUES ('ccf83045-bdbb-492f-8104-1808aabd67db', 'e21d6cc5-75c7-472f-aabf-c405626a9b69', 'ed3eb2bc-6ab5-482d-b4d9-9873a981c0ce', 1, 79.9);
INSERT INTO order_items (id, order_id, variant_id, quantity, unit_price) VALUES ('838a27b9-6e27-46be-89f6-6b35f6a1b848', 'e21d6cc5-75c7-472f-aabf-c405626a9b69', '6f18bc1a-3cf2-45b6-8126-7be3d7375f52', 1, 79.9);
INSERT INTO order_items (id, order_id, variant_id, quantity, unit_price) VALUES ('42289b3f-5f8e-47b7-baa3-4f6e347dc530', '54c0f6e0-3c18-49b2-9dbb-c303ce25298f', 'fe20b8e7-009c-4b34-bf20-dadd84b7d0c7', 1, 79.9);
INSERT INTO order_items (id, order_id, variant_id, quantity, unit_price) VALUES ('efd6ba7d-1fb7-4ed2-ab1c-a1f2957f4006', '54c0f6e0-3c18-49b2-9dbb-c303ce25298f', '6f18bc1a-3cf2-45b6-8126-7be3d7375f52', 1, 79.9);
INSERT INTO order_items (id, order_id, variant_id, quantity, unit_price) VALUES ('c0c76362-cd17-45d2-98d6-27639f80f33c', 'ca865576-94ca-4fe1-8fab-2ad1d7b5a71c', '49c3e6cc-7aab-49c8-9a9f-30082ceca811', 1, 79.9);
INSERT INTO order_items (id, order_id, variant_id, quantity, unit_price) VALUES ('22f984db-e603-4700-ad50-f8bd80a37530', 'ca865576-94ca-4fe1-8fab-2ad1d7b5a71c', '8a6f0744-454e-4e75-891e-a05e0b342b6e', 1, 79.9);
INSERT INTO order_items (id, order_id, variant_id, quantity, unit_price) VALUES ('39fbe24b-54d8-4fe8-9e45-7729c77b7480', '7b75d244-cb10-4af1-aa46-d1dc0b21192b', '8c6bdf47-e146-4878-b3dd-76eb41e89e86', 1, 79.9);
INSERT INTO order_items (id, order_id, variant_id, quantity, unit_price) VALUES ('05d5cbb4-8ecb-4bb3-bc95-5908eb9c0b34', '7b75d244-cb10-4af1-aa46-d1dc0b21192b', '5586debc-eb2f-4ac8-a4f3-5f6860636c75', 1, 79.9);
INSERT INTO order_items (id, order_id, variant_id, quantity, unit_price) VALUES ('8acc5b79-1455-47e4-b162-b569312f87b1', '497170bf-770c-4c63-9cc6-32a4b32f9abd', '8a6f0744-454e-4e75-891e-a05e0b342b6e', 1, 79.9);
INSERT INTO order_items (id, order_id, variant_id, quantity, unit_price) VALUES ('1b95efc1-f89a-4706-9796-8421f688a6c5', '497170bf-770c-4c63-9cc6-32a4b32f9abd', '49c3e6cc-7aab-49c8-9a9f-30082ceca811', 1, 79.9);
INSERT INTO order_items (id, order_id, variant_id, quantity, unit_price) VALUES ('7712760d-1ed2-4d36-8149-f4a664fdc4eb', 'fb3058b3-be25-4551-8b77-93966807c60c', '44b91e7c-2380-4339-ac54-b7e929200074', 1, 79.9);
INSERT INTO order_items (id, order_id, variant_id, quantity, unit_price) VALUES ('35d1468e-b506-4131-b05b-4f92347b97dd', 'fb3058b3-be25-4551-8b77-93966807c60c', '4bf4d20e-7209-41d7-ae50-fc21aa3d3a5f', 1, 79.9);
INSERT INTO favorites (id, user_id, product_id) VALUES ('37db923f-b53b-4edf-9ee6-d4e2281396d8', 'aeb29974-f6e3-465b-b25e-eb21100cf748', 'c3a0a2d8-8499-4305-b0c0-f6830d71c654');
INSERT INTO favorites (id, user_id, product_id) VALUES ('8d1940e8-8267-4152-a5d3-74d1bfd2e3e4', '80a26558-6698-49af-a5df-a24b47bddbec', '12dabb0b-fe06-498e-bb2d-7c30fc3a085a');
INSERT INTO favorites (id, user_id, product_id) VALUES ('dd3eebf4-d544-4640-b764-ce385b1fcb4b', '62ddc063-abe0-4bb3-82cb-ef85c2fcd98f', '3f11a1ab-2241-4466-b14e-53acfd4755fd');
INSERT INTO promotions (id, name, type, value, start_date, end_date) VALUES ('c04b9a3f-5b98-4ef6-931e-16fdec2c24bb', 'Promo discount', 'discount', 10, '2025-08-01', '2025-12-31');
INSERT INTO promotions (id, name, type, value, start_date, end_date) VALUES ('46343b52-f78d-48c0-bb40-8fe68f6dfc12', 'Promo 2+1', '2+1', 15, '2025-08-01', '2025-12-31');
INSERT INTO promotions (id, name, type, value, start_date, end_date) VALUES ('9f94b8bc-aa46-41dd-bb76-c525f76a5d04', 'Promo pack', 'pack', 20, '2025-08-01', '2025-12-31');
INSERT INTO promotion_products (id, promotion_id, product_id) VALUES ('6f121989-80d0-4197-830b-6e5bc7cf418b', 'c04b9a3f-5b98-4ef6-931e-16fdec2c24bb', 'bb10882e-d768-4155-9779-8d6fee3bf4fd');
INSERT INTO promotion_products (id, promotion_id, product_id) VALUES ('526380ce-ac17-42f0-9bfe-efce9fa6c362', 'c04b9a3f-5b98-4ef6-931e-16fdec2c24bb', '3f11a1ab-2241-4466-b14e-53acfd4755fd');
INSERT INTO promotion_products (id, promotion_id, product_id) VALUES ('91814568-311c-4547-a98d-ae7c1fa2ee31', '46343b52-f78d-48c0-bb40-8fe68f6dfc12', '2083a384-efa7-4712-8338-5f9c4a015ea9');
INSERT INTO promotion_products (id, promotion_id, product_id) VALUES ('b47d0b49-0ca8-4da7-9b2a-e717231e9cfa', '46343b52-f78d-48c0-bb40-8fe68f6dfc12', 'c3a0a2d8-8499-4305-b0c0-f6830d71c654');
INSERT INTO promotion_products (id, promotion_id, product_id) VALUES ('674fd3f7-c1d7-4c7b-ba14-1111b2b2e43a', '9f94b8bc-aa46-41dd-bb76-c525f76a5d04', '3f11a1ab-2241-4466-b14e-53acfd4755fd');
INSERT INTO promotion_products (id, promotion_id, product_id) VALUES ('077ed579-28fe-4033-a71d-1777c95e3ce9', '9f94b8bc-aa46-41dd-bb76-c525f76a5d04', 'd11fc311-72a9-4c9d-83a0-e6c4540fdf9f');
INSERT INTO commissions (id, referrer_id, referee_id, order_id, level, amount) VALUES ('dda497ab-f835-4c27-857d-c8451e076a1d', '43838954-a13b-42de-ad7f-c7a5e65c94e5', 'aeb29974-f6e3-465b-b25e-eb21100cf748', 'e21d6cc5-75c7-472f-aabf-c405626a9b69', 1, 5.99);
INSERT INTO commissions (id, referrer_id, referee_id, order_id, level, amount) VALUES ('e8fde620-dce5-4f48-b596-3ae706e73fd6', '43838954-a13b-42de-ad7f-c7a5e65c94e5', 'aeb29974-f6e3-465b-b25e-eb21100cf748', '54c0f6e0-3c18-49b2-9dbb-c303ce25298f', 2, 5.99);
INSERT INTO commissions (id, referrer_id, referee_id, order_id, level, amount) VALUES ('8678d558-9664-4655-8ff5-c75a9cb5750a', '43838954-a13b-42de-ad7f-c7a5e65c94e5', 'aeb29974-f6e3-465b-b25e-eb21100cf748', 'ca865576-94ca-4fe1-8fab-2ad1d7b5a71c', 3, 5.99);
INSERT INTO commissions (id, referrer_id, referee_id, order_id, level, amount) VALUES ('c45d10d0-2f32-4141-8919-ebdfee3de669', '43838954-a13b-42de-ad7f-c7a5e65c94e5', 'aeb29974-f6e3-465b-b25e-eb21100cf748', '7b75d244-cb10-4af1-aa46-d1dc0b21192b', 1, 5.99);
INSERT INTO commissions (id, referrer_id, referee_id, order_id, level, amount) VALUES ('cc5b0281-ccbc-4f84-85c7-50e5d955fe59', '43838954-a13b-42de-ad7f-c7a5e65c94e5', 'aeb29974-f6e3-465b-b25e-eb21100cf748', '497170bf-770c-4c63-9cc6-32a4b32f9abd', 2, 5.99);
INSERT INTO commissions (id, referrer_id, referee_id, order_id, level, amount) VALUES ('3a812be7-e8ce-4a04-89cb-3acb6f1d346e', '43838954-a13b-42de-ad7f-c7a5e65c94e5', 'aeb29974-f6e3-465b-b25e-eb21100cf748', 'fb3058b3-be25-4551-8b77-93966807c60c', 3, 5.99);
INSERT INTO commissions (id, referrer_id, referee_id, order_id, level, amount) VALUES ('d8b6527d-b3f9-454f-8341-5fad8360983b', '43838954-a13b-42de-ad7f-c7a5e65c94e5', 'aeb29974-f6e3-465b-b25e-eb21100cf748', 'e21d6cc5-75c7-472f-aabf-c405626a9b69', 1, 5.99);
INSERT INTO commissions (id, referrer_id, referee_id, order_id, level, amount) VALUES ('c848ccc0-8e9d-4d22-abbd-964d40cad16a', '43838954-a13b-42de-ad7f-c7a5e65c94e5', 'aeb29974-f6e3-465b-b25e-eb21100cf748', '54c0f6e0-3c18-49b2-9dbb-c303ce25298f', 2, 5.99);
INSERT INTO commissions (id, referrer_id, referee_id, order_id, level, amount) VALUES ('31d2abfd-e2e9-4f8d-b564-07a2b7f5dbf3', '43838954-a13b-42de-ad7f-c7a5e65c94e5', 'aeb29974-f6e3-465b-b25e-eb21100cf748', 'ca865576-94ca-4fe1-8fab-2ad1d7b5a71c', 3, 5.99);
INSERT INTO commission_payments (id, referrer_id, user_id, amount, payment_method, reference_code) VALUES ('0375a565-330d-45d9-a65c-715e767524de', '43838954-a13b-42de-ad7f-c7a5e65c94e5', '43838954-a13b-42de-ad7f-c7a5e65c94e5', 11.98, 'virement', 'REF-1');
INSERT INTO commission_payments (id, referrer_id, user_id, amount, payment_method, reference_code) VALUES ('30f8bbe2-5ac6-4206-8d64-138bc22df3c4', '43838954-a13b-42de-ad7f-c7a5e65c94e5', '43838954-a13b-42de-ad7f-c7a5e65c94e5', 11.98, 'virement', 'REF-2');
INSERT INTO commission_payments (id, referrer_id, user_id, amount, payment_method, reference_code) VALUES ('32c9af46-e819-42f2-a79e-f7a2f844dcd1', '43838954-a13b-42de-ad7f-c7a5e65c94e5', '43838954-a13b-42de-ad7f-c7a5e65c94e5', 11.98, 'virement', 'REF-3');
INSERT INTO commission_payment_items (id, payment_id, commission_id) VALUES ('5afebeba-039a-4d59-9e50-60f64b51be5d', '0375a565-330d-45d9-a65c-715e767524de', 'dda497ab-f835-4c27-857d-c8451e076a1d');
INSERT INTO commission_payment_items (id, payment_id, commission_id) VALUES ('a612a2ef-765a-46f1-8cef-7ea57b6819cf', '0375a565-330d-45d9-a65c-715e767524de', 'e8fde620-dce5-4f48-b596-3ae706e73fd6');
INSERT INTO commission_payment_items (id, payment_id, commission_id) VALUES ('c33a2923-7db1-4164-98c6-2ac1a77fa5a5', '0375a565-330d-45d9-a65c-715e767524de', '8678d558-9664-4655-8ff5-c75a9cb5750a');
INSERT INTO commission_payment_items (id, payment_id, commission_id) VALUES ('40d098f4-c246-4264-9408-dbecafb680c7', '30f8bbe2-5ac6-4206-8d64-138bc22df3c4', 'c45d10d0-2f32-4141-8919-ebdfee3de669');
INSERT INTO commission_payment_items (id, payment_id, commission_id) VALUES ('9d098c29-fec1-4d81-b75f-264015139ac1', '30f8bbe2-5ac6-4206-8d64-138bc22df3c4', 'cc5b0281-ccbc-4f84-85c7-50e5d955fe59');
INSERT INTO commission_payment_items (id, payment_id, commission_id) VALUES ('b137df6b-2bbf-4ce7-824f-b161d971b1e9', '30f8bbe2-5ac6-4206-8d64-138bc22df3c4', '3a812be7-e8ce-4a04-89cb-3acb6f1d346e');
INSERT INTO commission_payment_items (id, payment_id, commission_id) VALUES ('23b3f5cd-92ff-4f3f-b16a-c853f586ac77', '32c9af46-e819-42f2-a79e-f7a2f844dcd1', 'd8b6527d-b3f9-454f-8341-5fad8360983b');
INSERT INTO commission_payment_items (id, payment_id, commission_id) VALUES ('13c7d058-11bc-46da-8e20-14850b35afaf', '32c9af46-e819-42f2-a79e-f7a2f844dcd1', 'c848ccc0-8e9d-4d22-abbd-964d40cad16a');
INSERT INTO commission_payment_items (id, payment_id, commission_id) VALUES ('5cdd0a71-1ba4-4062-97d2-07aba1a81680', '32c9af46-e819-42f2-a79e-f7a2f844dcd1', '31d2abfd-e2e9-4f8d-b564-07a2b7f5dbf3');
INSERT INTO custom_commission_rules (id, user_id, level, commission_rate, start_date) VALUES ('6d582ced-6dd3-41d8-845f-c0437cf2ca16', 'aeb29974-f6e3-465b-b25e-eb21100cf748', 1, 0.1, '2025-08-01');
INSERT INTO custom_commission_rules (id, user_id, level, commission_rate, start_date) VALUES ('04b5f8bf-ad9a-421e-ae01-70c9134c9eb5', '80a26558-6698-49af-a5df-a24b47bddbec', 1, 0.1, '2025-08-01');
INSERT INTO custom_commission_rules (id, user_id, level, commission_rate, start_date) VALUES ('286924e9-3051-47b3-8456-64dc2617c3c8', '62ddc063-abe0-4bb3-82cb-ef85c2fcd98f', 1, 0.1, '2025-08-01');
INSERT INTO notifications (id, user_id, title, message, type) VALUES ('411c638e-fc7a-42b5-ae16-0bc99846f713', 'aeb29974-f6e3-465b-b25e-eb21100cf748', 'Bienvenue', 'Merci de vous être inscrit(e) !', 'info');
INSERT INTO notifications (id, user_id, title, message, type) VALUES ('d131a1dd-2815-4d9c-927c-ff7b5822aec3', '80a26558-6698-49af-a5df-a24b47bddbec', 'Bienvenue', 'Merci de vous être inscrit(e) !', 'info');
INSERT INTO notifications (id, user_id, title, message, type) VALUES ('8be7577c-c0c6-499d-a308-277ced37c157', '62ddc063-abe0-4bb3-82cb-ef85c2fcd98f', 'Bienvenue', 'Merci de vous être inscrit(e) !', 'info');
INSERT INTO notifications (id, user_id, title, message, type) VALUES ('fbb2ced3-9a9e-442c-957f-d35263c7228e', '43838954-a13b-42de-ad7f-c7a5e65c94e5', 'Bienvenue', 'Merci de vous être inscrit(e) !', 'info');
INSERT INTO notifications (id, user_id, title, message, type) VALUES ('fb499c22-c17b-4b58-a9f0-768ae9d2116e', '3a7f553b-edec-4ed6-8d26-c46308100c7e', 'Bienvenue', 'Merci de vous être inscrit(e) !', 'info');
INSERT INTO notifications (id, user_id, title, message, type) VALUES ('0113755d-e970-4879-b565-31bce3930ce3', '8eb84142-51fe-43ba-aa24-820791826236', 'Bienvenue', 'Merci de vous être inscrit(e) !', 'info');
INSERT INTO admin_settings (id, key, value, type, description) VALUES ('570aab1e-5754-4193-9dd6-4d93a30bec9d', 'global_discount_rate', '0.1', 'decimal', 'Remise globale');
INSERT INTO admin_settings (id, key, value, type, description) VALUES ('87ce9d90-443b-42bd-a943-89466631a7cc', 'birthday_bonus_enabled', 'true', 'boolean', 'Bonus anniversaire');
INSERT INTO admin_settings (id, key, value, type, description) VALUES ('29c3e117-64f8-41c0-b97f-2f9ccba38d69', 'minimum_referrals', '3', 'int', 'Nb filleuls min.');
INSERT INTO admin_settings (id, key, value, type, description) VALUES ('c2368baf-5db1-46bc-9f71-489ef9200e9f', 'minimum_sales', '5', 'int', 'Nb ventes min.');
INSERT INTO user_logs (id, user_id, action, details, ip_address, device) VALUES ('869fdbd2-fbea-4527-8209-a26532211a5c', 'aeb29974-f6e3-465b-b25e-eb21100cf748', 'login', 'Connexion réussie', '127.0.0.1', 'Chrome');
INSERT INTO user_logs (id, user_id, action, details, ip_address, device) VALUES ('5f87f158-b7be-442d-929b-5a8b3687ef9a', '80a26558-6698-49af-a5df-a24b47bddbec', 'login', 'Connexion réussie', '127.0.0.1', 'Chrome');
INSERT INTO user_logs (id, user_id, action, details, ip_address, device) VALUES ('2f200a14-8a74-418f-a016-3eb086e5f3b2', '62ddc063-abe0-4bb3-82cb-ef85c2fcd98f', 'login', 'Connexion réussie', '127.0.0.1', 'Chrome');
INSERT INTO user_logs (id, user_id, action, details, ip_address, device) VALUES ('f0bc04cb-0315-48f1-ab13-2e68187f9dbe', '43838954-a13b-42de-ad7f-c7a5e65c94e5', 'login', 'Connexion réussie', '127.0.0.1', 'Chrome');
INSERT INTO user_logs (id, user_id, action, details, ip_address, device) VALUES ('4fcee1d2-1809-4259-b1ee-7003567ed80c', '3a7f553b-edec-4ed6-8d26-c46308100c7e', 'login', 'Connexion réussie', '127.0.0.1', 'Chrome');
INSERT INTO user_logs (id, user_id, action, details, ip_address, device) VALUES ('e1321874-73da-4b0e-b7ea-1c49a5c0108d', '8eb84142-51fe-43ba-aa24-820791826236', 'login', 'Connexion réussie', '127.0.0.1', 'Chrome');
INSERT INTO products (
        id, product_code, lolly_name, inspired_name, inspired_brand, gender,
        season, olfactory_family, top_notes, heart_notes, base_notes, description, image_url
    ) VALUES (
        '8bbc9b4a-822b-45a2-9c87-162f168fc77e', 'PRD-001', 'Lolly Belle', 'La Vie est Belle', 'Lancôme', 'mixte',
        'automne', 'Florale Gourmande', 'Poire, Cassis', 'Iris, Jasmin, Fleur d’oranger', 'Vanille, Praliné, Patchouli, Fève tonka', 'Une essence joyeuse et lumineuse, qui célèbre la féminité avec douceur et élégance.', 'https://example.com/image1.jpg'
    );
INSERT INTO products (
        id, product_code, lolly_name, inspired_name, inspired_brand, gender,
        season, olfactory_family, top_notes, heart_notes, base_notes, description, image_url
    ) VALUES (
        '68f881ef-faed-4c09-a273-4edd560609eb', 'PRD-002', 'Lolly Sauvage', 'Sauvage', 'Dior', 'mixte',
        'toutes saisons', 'Aromatique Fougère', 'Bergamote de Calabre', 'Poivre Sichuan, Lavande', 'Ambroxan, Vétiver, Cèdre', 'Un parfum brut et raffiné, inspiré de grands espaces et de liberté masculine.', 'https://example.com/image2.jpg'
    );
INSERT INTO products (
        id, product_code, lolly_name, inspired_name, inspired_brand, gender,
        season, olfactory_family, top_notes, heart_notes, base_notes, description, image_url
    ) VALUES (
        '13fb5699-9927-4891-97da-6d32e9f2e2c0', 'PRD-003', 'Lolly Mademoiselle', 'Coco Mademoiselle', 'Chanel', 'mixte',
        'printemps', 'Chypré Floral', 'Orange, Mandarine, Fleur d’oranger', 'Rose, Jasmin, Ylang-Ylang', 'Patchouli, Vétiver, Vanille', 'Une élégance rebelle, à la fois fraîche et sophistiquée.', 'https://example.com/image3.jpg'
    );
INSERT INTO products (
        id, product_code, lolly_name, inspired_name, inspired_brand, gender,
        season, olfactory_family, top_notes, heart_notes, base_notes, description, image_url
    ) VALUES (
        'fdc21bde-6fa1-4338-8315-334b5f6eab00', 'PRD-004', 'Lolly Blue', 'Light Blue', 'Dolce & Gabbana', 'mixte',
        'été', 'Fruité Floral', 'Citron de Sicile, Pomme Granny', 'Jasmin, Bambou, Rose blanche', 'Cèdre, Ambre, Musc', 'Un vent frais et solaire, plein de vitalité méditerranéenne.', 'https://example.com/image4.jpg'
    );
INSERT INTO products (
        id, product_code, lolly_name, inspired_name, inspired_brand, gender,
        season, olfactory_family, top_notes, heart_notes, base_notes, description, image_url
    ) VALUES (
        '28f60f14-8d4d-44d6-a2ff-120594d9baed', 'PRD-005', 'Lolly Opium', 'Black Opium', 'Yves Saint Laurent', 'mixte',
        'hiver', 'Orientale Gourmande', 'Poire, Poivre rose, Fleur d’oranger', 'Café, Jasmin, Amande amère', 'Vanille, Bois de cèdre, Patchouli', 'Une énergie irrésistible et nocturne, avec une addiction sucrée-épicée.', 'https://example.com/image5.jpg'
    );
INSERT INTO products (
        id, product_code, lolly_name, inspired_name, inspired_brand, gender,
        season, olfactory_family, top_notes, heart_notes, base_notes, description, image_url
    ) VALUES (
        'ca6d11b5-f5ba-4faa-b9d9-5e0589b32daa', 'PRD-006', 'Lolly Terre', 'Terre d’Hermès', 'Hermès', 'mixte',
        'automne', 'Boisé Épicé', 'Orange, Pamplemousse', 'Poivre, Géranium', 'Vétiver, Benjoin, Cèdre', 'Une alliance entre la terre et le ciel, à la fois minérale et boisée.', 'https://example.com/image6.jpg'
    );


INSERT INTO users (
    id, first_name, last_name, email, phone_number, birth_date, password,
    role, facebook_id, messenger_id, referrer_id, level_id
) VALUES
('633bb2db-6803-4d82-82c5-f6d49a666c93', 'Youssef', 'Ladmin', 'admin@lolly.tn', '209000001', '1980-01-01', 'taftoufa', 'admin', 'fb_admin', 'msg_admin', NULL, NULL),
('501b77b1-bf25-46f1-a98f-5d8fddafe740', 'Amira', 'Ladvisor', 'conseillere@lolly.tn', '209000002', '1990-01-01', 'taftoufa', 'advisor', 'fb_advisor', 'msg_advisor', NULL, NULL),
('9972d0f5-68f7-4222-bccf-78ef5ef3ea84', 'Leila', 'Lclient', 'client@lolly.tn', '209000003', '2000-01-01', 'taftoufa', 'client', 'fb_client', 'msg_client', NULL, NULL);
