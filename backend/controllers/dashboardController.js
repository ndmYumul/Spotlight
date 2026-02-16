export function getDashboardData(req, res) {
  const users = [
    { user_id: 1, full_name: "Test User", email: "test@example.com", role: "user", subscription_type: "free", created_at: new Date() }
  ];
  const schedules = [
    { id: 1, name: "Morning Shift", start_time: "08:00", end_time: "12:00" }
  ];
  const parkingBuildings = [{ id: 1, name: "Building A" }];
  const parkingSlots = [{ id: 1, building_id: 1, slot_number: "A1" }];
  const assignments = [{ id: 1, user_id: 1, slot_id: 1 }];
  const aiLogs = [{ id: 1, event: "AI checked slot availability" }];

  res.json({ users, schedules, parkingBuildings, parkingSlots, assignments, aiLogs });
}
