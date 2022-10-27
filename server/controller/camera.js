const Camera = require('../models/camera')

exports.getCameras = async (req, res) => {
  const { areaId, crossroadId } = req.body

  try {
    const cameras = await Camera.find({ areaId, crossroadId }).exec()
    if (!cameras) {
      return res.status(404).json({ error: 'No Cameras Found' })
    } else {
      return res.status(200).json({ cameras })
    }
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

exports.addCamera = async (req, res) => {
  const { areaId, crossroadId, name } = req.body
  try {
    const camera = await Camera.findOne({
      areaId,
      crossroadId,
      code: name,
    }).exec()
    if (camera) {
      return res.status(400).json({ error: 'Camera already exists' })
    }

    const _camera = new Camera({ code: name, areaId, crossroadId })
    const data = _camera.save()

    if (data) {
      return res.status(200).json({ message: 'Camera added successfully' })
    } else {
      return res
        .status(500)
        .json({ error: 'Something went wrong. Please try again.' })
    }
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}
// return all the videos from this camera
// add video
// view video
// .. more to come
