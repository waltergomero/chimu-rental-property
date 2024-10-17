import { getProviders } from 'next-auth/react';

export default async function LoginPage() {
  const providers = await getProviders();

  return (
    <div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}
