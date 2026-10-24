import type { Schedule } from './schedule';

// Synthetic timetable for tests — the real one lives only on her phone.
export const SCHEDULE_FIXTURE: Schedule = {
  version: 1,
  slots: [
    { kind: 'lessons', time: '', label: 'בוקר', cells: [['משחק'], ['משחק'], ['משחק'], ['משחק'], ['משחק'], ['יצירה']] },
    { kind: 'lessons', time: '8:00-8:50', label: '', cells: [['שפה', 'כתיבה'], ['מתמטיקה', 'מורה א.'], ['אנגלית', 'מורה ב.'], ['חנ״ג'], ['מדעים'], ['חינוך']] },
    { kind: 'ribbon', time: '8:50-9:10', title: 'הפסקה' },
    { kind: 'lessons', time: '9:10-10:00', label: '', cells: [['גאומטריה'], ['שפה'], ['מתמטיקה'], null, ['אנגלית'], null] },
    { kind: 'ribbon', time: '10:00-10:15', title: 'הפסקה קטנה' },
    { kind: 'lessons', time: '10:15-11:00', label: '', cells: [['תנ״ך'], ['יזמות'], ['מדעים'], ['תח״ס'], null, null] },
  ],
};
