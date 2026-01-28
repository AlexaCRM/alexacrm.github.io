import React, {useEffect, useMemo, useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';

type HeadingItem = {
  id: string;
  value: string;
  level: number; // 2..4
};

function extractHeadingsFrom(container: HTMLElement, minLevel = 2, maxLevel = 4): HeadingItem[] {
  const headings = Array.from(container.querySelectorAll<HTMLElement>(
    Array.from({length: maxLevel - minLevel + 1}, (_, i) => `h${i + minLevel}`).join(',')
  ));

  return headings
    .filter(h => !!h.id) // docusaurus/remark обычно ставит id
    .map(h => ({
      id: h.id,
      value: h.innerText.trim(),
      level: Number(h.tagName.substring(1)),
    }));
}

export default function TabTOC() {
  const [items, setItems] = useState<HeadingItem[]>([]);

  useEffect(() => {
    // Находим активный tabpanel (Tabs из @theme/Tabs рендерит их как role="tabpanel")
    const update = () => {
      const panels = Array.from(document.querySelectorAll<HTMLElement>('[role="tabpanel"]'));
      // Активная панель — та, которая не скрыта (обычно невидимые имеют hidden или aria-hidden)
      const active = panels.find(p => !p.hasAttribute('hidden') && p.getAttribute('aria-hidden') !== 'true');
      if (!active) {
        setItems([]);
        return;
      }
      const headings = extractHeadingsFrom(active, 2, 4);
      setItems(headings);
    };

    update();

    // Перестраиваем TOC при клике по табам и при навигации по якорям
    const clickHandler = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[role="tab"]')) {
        // Немного отложим, чтобы вкладка успела смениться
        setTimeout(update, 0);
      }
    };

    document.addEventListener('click', clickHandler);
    window.addEventListener('hashchange', update);

    // На всякий случай перестроим на ресайз (иногда меняются скрытые статусы)
    window.addEventListener('resize', update);

    return () => {
      document.removeEventListener('click', clickHandler);
      window.removeEventListener('hashchange', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  if (!items.length) {
    return null;
  }

  // Строим вложенные уровни (h2 → h3 → h4) простым списком с отступами
  return (
    <nav aria-label="Содержание вкладки" className="tab-toc">

      <ul className="tab-toc-list">
        {items.map(item => (
          <li key={item.id} className={`level-${item.level}`}>
            <Link to={`#${item.id}`}>{item.value}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Обёртка для SSR
export function TabTOCBrowserOnly() {
  return (
    <BrowserOnly>
      {() => <TabTOC />}
    </BrowserOnly>
  );
}