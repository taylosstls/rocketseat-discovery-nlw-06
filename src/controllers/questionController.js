const Database = require('../db/config')
module.exports = {
  async index(req, res) {
    const db = await Database()
    const roomId = req.params.room,
      questionId = req.params.question,
      action = req.params.action,
      password = req.body.password

    const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

    if (verifyRoom.pass == password) {
      if (action == 'delete') {
        await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
      } else if (action == 'check') {
        await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId} `)
      }
      res.redirect(`/room/${roomId}`)
    } else {
      res.render('passincorrect', { roomId: roomId })
    }
  },

  async create(req, res) {
    const db = await Database()
    const questionId = req.body.question
    const roomId = req.params.room

    await db.run(`INSERT INTO questions(
			title,
			room,
			read
		) VALUES (
			"${questionId}",
			${roomId},
			0
		)`)

    res.redirect(`/room/${roomId}`)
  }
}
