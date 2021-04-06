import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Alert from '../../components/alert';
import Layout, { siteTitle } from '../../components/layout';
import { get } from '../../lib/api/user';
import checkLogin from '../../lib/utils/checklogin';
import fetcher from '../../lib/utils/fetcher';
import storage from '../../lib/utils/storage';

export async function getServerSideProps({ query: { pid } }) {
  const { data: initialProfile } = await get(pid);
  return { props: { initialProfile } };
}

export default function Profile({ initialProfile }) {
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const {
    data: fetchedProfile,
    error: profileError,
  } = useSWR(
    `${process.env.apiUrl}/users/${encodeURIComponent(String(pid))}`,
    fetcher,
    { initialData: initialProfile },
  );

  if (profileError) return <Alert error>Cannot load profile</Alert>;

  const { profile } = fetchedProfile || initialProfile;
  const {
    username, bio, image, following,
  } = profile;

  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);
  // const isUser = currentUser && handle === currentUser?.handle;

  return (
    <Layout login>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>{username}</h1>
    </Layout>
  );
}
