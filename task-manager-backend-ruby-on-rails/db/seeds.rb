User.create_with(
  name: 'Carlos Alberto',
  password: "12345678",
  password_confirmation: "12345678",
  avatar: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII'
).find_or_create_by(
  email: "admin@example.com",
)

User.create_with(
  name: 'Jeferson Krauss',
  password: "12345678",
  password_confirmation: "12345678",
  avatar: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII'
).find_or_create_by(
  email: "jeferson.krauss@gmail.com",
)