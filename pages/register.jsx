import Head from 'next/head';
import RegisterForm from '../components/register-form';
// import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';

export default function Login() {
  return (
    <Layout register>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <RegisterForm />
    </Layout>
  );
}
