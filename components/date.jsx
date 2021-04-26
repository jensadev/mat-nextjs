import { format, parseISO } from 'date-fns';
import { en, sv } from 'date-fns/locale';
import { useRouter } from 'next/router';

export default function Date({ classNames, dateString }) {
  const router = useRouter();
  const date = parseISO(dateString);
  return (
    <time className={classNames} dateTime={dateString}>
      {format(date, 'PPPP', { locale: router.locale === 'en' ? en : sv })}
    </time>
  );
}
