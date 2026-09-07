import { useEffect, useState } from 'react';

export function useActiveAnchor(anchors: string[], threshold: number = 0.28): string {
  const [active, setActive] = useState<string>(anchors[0] ?? '');

  useEffect(() => {
    if (anchors.length === 0) return;
    setActive(anchors[0] ?? '');

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = window.innerHeight * threshold;

      for (let i = anchors.length - 1; i >= 0; i--) {
        const id = anchors[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY + offset) {
          setActive(id);
          return;
        }
      }
      setActive(anchors[0] ?? '');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [anchors.join(','), threshold]);

  return active;
}
