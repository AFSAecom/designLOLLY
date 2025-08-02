# Structure technique de la base de données Lolly

Ce document décrit les 16 tables du schéma PostgreSQL utilisé par l'application Lolly. Chaque section présente les champs, les contraintes principales, les relations et un exemple de donnée issu du fichier `seed.sql` lorsqu'il est disponible.

Les variables d'environnement nécessaires à la connexion Supabase sont :

```env
VITE_SUPABASE_URL="<url du projet Supabase>"
VITE_SUPABASE_ANON_KEY="<clé publique anon>"
```

## T01 – users
| Colonne | Type | Contraintes |
| --- | --- | --- |
| id | UUID | PK, défaut `gen_random_uuid()` |
| first_name | VARCHAR | NOT NULL |
| last_name | VARCHAR | NOT NULL |
| email | VARCHAR |  |
| phone_number | VARCHAR | UNIQUE |
| birth_date | DATE | UNIQUE |
| password | TEXT |  |
| facebook_id | VARCHAR | UNIQUE |
| messenger_id | VARCHAR | UNIQUE |
| role | VARCHAR | NOT NULL, CHECK (`client`\|`advisor`\|`admin`) |
| referrer_id | UUID | FK → users.id |
| level_id | UUID | FK → levels.id |
| created_at | TIMESTAMP | défaut `now()` |

*Exemple :* utilisateur Alpha Client (`client`)【seed.sql†L13-L18】

## T02 – products
| Colonne | Type | Contraintes |
| --- | --- | --- |
| id | UUID | PK, défaut `gen_random_uuid()` |
| product_code | VARCHAR | UNIQUE, NOT NULL |
| lolly_name | VARCHAR | NOT NULL |
| inspired_name | VARCHAR | NOT NULL |
| inspired_brand | VARCHAR | NOT NULL |
| gender | VARCHAR | NOT NULL, CHECK (`male`\|`female`\|`unisex`) |
| season | VARCHAR |  |
| olfactory_family | VARCHAR |  |
| top_notes | TEXT |  |
| heart_notes | TEXT |  |
| base_notes | TEXT |  |
| description | TEXT |  |
| image_url | TEXT |  |

*Exemple :* P001 « Éclat Floral » inspiré de J’adore【seed.sql†L21-L27】

## T03 – product_variants
| Colonne | Type | Contraintes |
| --- | --- | --- |
| id | UUID | PK, défaut `gen_random_uuid()` |
| product_id | UUID | FK → products.id, NOT NULL |
| volume_ml | INTEGER | NOT NULL, CHECK (>0) |
| price_tnd | DECIMAL | NOT NULL, CHECK (>=0) |
| stock_quantity | INTEGER | défaut 0, CHECK (>=0) |
| variant_code | VARCHAR | UNIQUE, NOT NULL |

*Exemple :* variante `P001-V1` 50 ml à 59.9 TND【seed.sql†L29-L35】

## T04 – orders
| Colonne | Type | Contraintes |
| --- | --- | --- |
| id | UUID | PK, défaut `gen_random_uuid()` |
| user_id | UUID | FK → users.id, NOT NULL |
| advisor_id | UUID | FK → users.id |
| created_at | TIMESTAMP | défaut `now()` |
| total_ht | DECIMAL | NOT NULL, CHECK (>=0) |
| total_ttc | DECIMAL | NOT NULL, CHECK (>=0) |
| status | VARCHAR | NOT NULL, CHECK (`pending`\|`paid`\|`cancelled`) |

*Exemple :* commande `44444444-...-0001` payée par Alpha Client【seed.sql†L44-L48】

## T05 – order_items
| Colonne | Type | Contraintes |
| --- | --- | --- |
| id | UUID | PK, défaut `gen_random_uuid()` |
| order_id | UUID | FK → orders.id, NOT NULL |
| variant_id | UUID | FK → product_variants.id, NOT NULL |
| quantity | INTEGER | NOT NULL, CHECK (>0) |
| unit_price | DECIMAL | NOT NULL, CHECK (>=0) |

*Exemple :* 1 article à 59.9 TND pour la commande `...0001`【seed.sql†L50-L56】

## T06 – favorites
| Colonne | Type | Contraintes |
| --- | --- | --- |
| id | UUID | PK, défaut `gen_random_uuid()` |
| user_id | UUID | FK → users.id, NOT NULL |
| product_id | UUID | FK → products.id, NOT NULL |
| created_at | TIMESTAMP | défaut `now()` |
| (user_id, product_id) | — | UNIQUE |

*Aucune donnée de seed fournie.*

## T07 – promotions
| Colonne | Type | Contraintes |
| --- | --- | --- |
| id | UUID | PK, défaut `gen_random_uuid()` |
| name | VARCHAR | NOT NULL |
| type | VARCHAR | NOT NULL, CHECK (`discount`\|`2+1`\|`pack`) |
| value | DECIMAL | NOT NULL, CHECK (>=0) |
| condition_json | JSONB |  |
| start_date | DATE | NOT NULL |
| end_date | DATE | NOT NULL |
| created_at | TIMESTAMP | défaut `now()` |

*Exemple :* promotion « Lancement Été » -20 %【seed.sql†L37-L40】

## T08 – promotion_products
| Colonne | Type | Contraintes |
| --- | --- | --- |
| id | UUID | PK, défaut `gen_random_uuid()` |
| promotion_id | UUID | FK → promotions.id, NOT NULL |
| product_id | UUID | FK → products.id, NOT NULL |
| created_at | TIMESTAMP | défaut `now()` |

*Exemple :* promotion `Lancement Été` appliquée au produit `P001`【seed.sql†L41-L42】

## T09 – commissions
| Colonne | Type | Contraintes |
| --- | --- | --- |
| id | UUID | PK, défaut `gen_random_uuid()` |
| referrer_id | UUID | FK → users.id, NOT NULL |
| referee_id | UUID | FK → users.id, NOT NULL |
| order_id | UUID | FK → orders.id, NOT NULL |
| level | INTEGER | NOT NULL, CHECK (1–3) |
| amount | DECIMAL | NOT NULL, CHECK (>=0) |
| created_at | TIMESTAMP | défaut `now()` |

*Exemple :* commission 5.99 TND pour Lila (niveau 1) sur Alpha【seed.sql†L58-L62】

## T10 – commission_payments
| Colonne | Type | Contraintes |
| --- | --- | --- |
| id | UUID | PK, défaut `gen_random_uuid()` |
| referrer_id | UUID | FK → users.id, NOT NULL |
| amount | DECIMAL | NOT NULL, CHECK (>=0) |
| payment_date | TIMESTAMP | défaut `now()` |
| payment_method | VARCHAR |  |
| reference_code | VARCHAR | UNIQUE |
| note | TEXT |  |

*Aucune donnée de seed fournie.*

## T11 – commission_payment_items
| Colonne | Type | Contraintes |
| --- | --- | --- |
| id | UUID | PK, défaut `gen_random_uuid()` |
| payment_id | UUID | FK → commission_payments.id, NOT NULL |
| commission_id | UUID | UNIQUE, FK → commissions.id, NOT NULL |
| created_at | TIMESTAMP | défaut `now()` |

*Aucune donnée de seed fournie.*

## T12 – levels
| Colonne | Type | Contraintes |
| --- | --- | --- |
| id | UUID | PK, défaut `gen_random_uuid()` |
| name | VARCHAR | UNIQUE, NOT NULL |
| rank | INTEGER | UNIQUE, NOT NULL |
| description | TEXT |  |
| min_sales_count | INTEGER | défaut 0 |
| min_referrals_count | INTEGER | défaut 0 |
| commission_rate | DECIMAL | défaut 0, CHECK (>=0) |
| badge_url | TEXT |  |
| created_at | TIMESTAMP | défaut `now()` |

*Exemple :* niveau « Lolly Seed I » commission 5 %【seed.sql†L2-L9】

## T13 – notifications
| Colonne | Type | Contraintes |
| --- | --- | --- |
| id | UUID | PK, défaut `gen_random_uuid()` |
| user_id | UUID | FK → users.id, NOT NULL |
| title | VARCHAR | NOT NULL |
| message | TEXT | NOT NULL |
| type | VARCHAR | NOT NULL, CHECK (`info`\|`alert`\|`success`\|`warning`) |
| read | BOOLEAN | défaut `false` |
| created_at | TIMESTAMP | défaut `now()` |

*Exemple :* message de bienvenue pour Alpha Client【seed.sql†L64-L66】

## T14 – admin_settings
| Colonne | Type | Contraintes |
| --- | --- | --- |
| id | UUID | PK, défaut `gen_random_uuid()` |
| key | VARCHAR | UNIQUE, NOT NULL |
| value | TEXT | NOT NULL |
| description | TEXT |  |
| type | VARCHAR | NOT NULL, CHECK (`int`\|`decimal`\|`boolean`\|`text`) |
| updated_at | TIMESTAMP | défaut `now()` |

*Aucune donnée de seed fournie.*

## T15 – custom_commission_rules
| Colonne | Type | Contraintes |
| --- | --- | --- |
| id | UUID | PK, défaut `gen_random_uuid()` |
| user_id | UUID | FK → users.id, NOT NULL |
| level | INTEGER | NOT NULL, CHECK (1–3) |
| commission_rate | DECIMAL | NOT NULL, CHECK (>=0) |
| start_date | DATE | NOT NULL |
| end_date | DATE |  |
| note | TEXT |  |
| created_at | TIMESTAMP | défaut `now()` |

*Aucune donnée de seed fournie.*

## T16 – user_logs
| Colonne | Type | Contraintes |
| --- | --- | --- |
| id | UUID | PK, défaut `gen_random_uuid()` |
| user_id | UUID | FK → users.id, NOT NULL |
| action | VARCHAR | NOT NULL |
| details | TEXT |  |
| ip_address | VARCHAR |  |
| device | VARCHAR |  |
| created_at | TIMESTAMP | défaut `now()` |

*Aucune donnée de seed fournie.*

---

### Système de parrainage Lolly Forest
Le parrainage multi-niveaux s'appuie sur :
- **users** : lien `referrer_id` vers l'utilisateur parrain【schema.sql†L26-L27】
- **levels** : définition des rangs et taux de commission【schema.sql†L2-L13】
- **commissions** : montants générés pour chaque parrain【schema.sql†L108-L116】
- **commission_payment_items** : association des commissions aux paiements【schema.sql†L130-L135】
- **custom_commission_rules** : règles de commission personnalisées par utilisateur【schema.sql†L159-L168】

Ce document permet d'initialiser la base de données dans Supabase en exécutant `schema.sql` puis `seed.sql`.
