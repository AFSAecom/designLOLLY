# Authentification et gestion des rôles

Ce module met en place l'authentification Supabase (email/mot de passe et Facebook) et la répartition des utilisateurs par rôle : `client`, `advisor`, `admin`.

## Flux général
```text
[Utilisateur]
   | 1. email/password ou Facebook
   v
[Supabase Auth] --2. insertion--> [Table users (id, role, facebook_id, messenger_id)]
   | 3. session retournée
   v
[AuthProvider] --4. contexte React--> [UI & ProtectedRoute]
```

1. L'utilisateur se connecte ou crée un compte via Supabase.
2. Si l'utilisateur n'existe pas encore dans `users`, son profil est inséré avec le rôle approprié et les identifiants Facebook/Messenger.
3. `AuthProvider` écoute les changements de session et récupère le profil depuis la base.
4. `useAuth` expose les informations au frontend et `ProtectedRoute` protège les pages selon le rôle.

## Inscription email
```ts
const { error } = await signUp({
  email: 'test@lolly.tn',
  password: 'test1234',
  firstName: 'Marie',
  lastName: 'Dupont',
  role: 'client',
});
```

## Connexion
```ts
const { error } = await signIn(email, password);
```

## Connexion Facebook
```ts
await signInWithFacebook();
```
Les identifiants `facebook_id` et `messenger_id` sont automatiquement enregistrés lors du premier retour de session.

## Redirections selon le rôle
- `client` → `/client/dashboard`
- `advisor` → `/conseillere/dashboard`
- `admin` → `/admin/dashboard`

Toute route protégée utilise `ProtectedRoute`:
```tsx
<Route path="/admin/dashboard" element={
  <ProtectedRoute roles={["admin"]}>
    <AdminDashboard />
  </ProtectedRoute>
} />
```

Aucune conseillère ne peut accéder au tableau de bord client (et donc au parrainage) grâce à cette vérification de rôle.
