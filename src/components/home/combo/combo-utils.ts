export const extractServings = (title: string, desc: string): string => {
  const text = `${title} ${desc}`.toLowerCase();
  const match = /(\d+\s*[-–]\s*\d+|\d+)\s*(?:người|khách|pax)/u.exec(text);
  if (match?.[1]) {
    return `${match[1].replaceAll(' ', '')} người`;
  }
  return '2 - 4 người';
};

export const cleanDescription = (title: string, desc: string): string => {
  if (!desc) {
    return 'Đầy đủ hải sản tươi ngon, sơ chế sẵn kèm trọn bộ gia vị sốt chấm chuẩn vị.';
  }
  let result = desc.trim();
  if (result.toLowerCase().startsWith(title.toLowerCase())) {
    result = result
      .slice(title.length)
      .replace(/^[\s\-:–,]+/u, '')
      .trim();
  }
  return result || desc;
};

export const getBadgeClass = (tag?: string): string => {
  const lower = (tag ?? '').toLowerCase();
  if (lower.includes('tiết kiệm') || lower.includes('deal')) {
    return 'bg-tertiary text-white';
  }
  if (lower.includes('bán chạy') || lower.includes('hot')) {
    return 'bg-primary text-white';
  }
  if (lower.includes('cuối tuần') || lower.includes('vip')) {
    return 'bg-accent text-foreground';
  }
  return 'bg-secondary text-white';
};
