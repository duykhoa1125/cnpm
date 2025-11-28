/**
 * Mock Bonus Session Data
 * Contains bonus tutoring sessions and RSVP data
 */

// Bonus Session Data
export let bonusSessions = [
  {
    id: "S1",
    title: "Ôn tập Giải tích 1",
    course: "CO1023",
    date: "2025-11-28",
    start: "14:00",
    duration: 60,
    mode: "ONLINE",
    location: "Zoom Meeting",
    tutor: "Nguyen Van B",
    status: "ACTIVE",
    count: 5,
    max: 30,
    scope: "CLASS",
  },
];

export function setBonusSessions(sessions) {
  bonusSessions = sessions;
}

export function addBonusSession(session) {
  bonusSessions.push(session);
}

export let bonusRsvps = [
  {
    id: "R1",
    sessionId: "S1",
    studentId: "sv001",
    name: "Nguyen Van A",
    status: "ACCEPTED",
  },
];

export function setBonusRsvps(rsvps) {
  bonusRsvps = rsvps;
}
