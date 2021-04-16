import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout, { siteTitle } from '../components/layout';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'glossary']))
    }
  };
}

export default function Legal() {
  const { t } = useTranslation(['common', 'glossary']);
  return (
    <Layout legal>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main className="d-flex flex-column">
        <header className="page-header">
          <div className="container">
            <h1 className="page-heading">
              {t('terms')}
              {/* {`${t('common:cookie')} &
              ${t('common:privacy')} ${t('common:policy')}`} */}
            </h1>
          </div>
          <span className="bg-legal" />
        </header>
        <div className="content w-100">
          <div className="container">
            <h1>Inställningar för cookies</h1>
            <p>
              När du besöker en webbplats kan den lagra eller hämta information
              i din webbläsare, främst i form av cookies. Den här informationen
              kan vara om dig, dina preferenser, eller din enhet och används
              mestadels för att webbplatsen ska fungerar som du förväntar dig.
              Informationen identifierar dig vanligtvis inte direkt, men den kan
              ge dig en mer personlig webbupplevelse.
            </p>
            <p>
              Eftersom vi respekterar din rätt till integritet, sparar vi enbart
              nödvändig data för sidans funktionalitet.
            </p>
            <h1>Integritetspolicy</h1>
            <h2>Information om vår behandling av dina personuppgifter</h2>
            <p>
              Pådenna webbplats arbetar vi kontinuerligt för att säkerställa att
              all vår personuppgiftsbehandling sker i enlighet med
              Dataskyddsförordningen (”GDPR”).
            </p>
            <p>
              Din integritet är viktig för oss och vi strävar efter att
              säkerställa en hög skyddsnivå när vi behandlar dina
              personuppgifter. I denna integritetspolicy ger vi dig information
              om hur vi behandlar dina personuppgifter när du besöker och
              använder webbplatsen. Vi beskriver också vilka rättigheter du har
              i samband med vår behandling av dina personuppgifter.
            </p>
            <p>
              Vi kan komma att ändra denna policy som en del av vårt
              kontinuerliga arbete med dataskyddsfrågor, men du hittar alltid
              den senaste versionen på denna webbplats.
            </p>
            <h2>Personuppgiftsansvaret</h2>
            <p>
              Denna webbplats är personuppgiftsansvarig för de personuppgifter
              som samlas in och behandlas av oss. Webbplatsen kan innehålla
              länkar till externa webbplatser eller tjänster som vi inte
              kontrollerar. Om du delar personuppgifter med externa parter via
              sådana länkar är det den externa parten som är
              personuppgiftsansvarig för dina personuppgifter och vi
              rekommenderar att du läser deras integritetspolicy för mer
              information.
            </p>
            <p>
              Om du har några frågor eller funderingar kring hur denna webbplats
              behandlar dina personuppgifter, kontakta oss.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}