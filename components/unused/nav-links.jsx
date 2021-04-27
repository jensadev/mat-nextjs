import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function NavLinks() {
    const router = useRouter();
    const pages = ['meals', 'dishes', 'profile'];
    const { t } = useTranslation(['common', 'glossary']);
    console.log(router.pathname);
    return (
        <>
            {pages.map((page) => {
                <Link href={`/${page}`}>
                    <a>{page}</a>
                </Link>;
            })}
        </>
    );

    // let className = children.props.className || '';
    // if (router.pathname === href) {
    //   className = `${className} active`;
    // }

    // return <Link href={href}>{cloneElement(children, { className })}</Link>;
}
