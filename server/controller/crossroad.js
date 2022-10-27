const CrossRoad = require('../models/crossroad')

exports.getCrossRoads = async (req, res) => {
  const { areaId } = req.body
  try {
    const crossroads = await CrossRoad.find({ areaId: areaId }).exec()

    if (!crossroads) {
      return res.status(404).json({ error: 'No Crossroad found' })
    }

    res.status(200).json({ area })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.getCrossRoadByName = async (req, res) => {
  const { name, areaId } = req.body
  try {
    const crossroad = await CrossRoad.findOne({
      name: name,
      areaId: areaId,
    }).exec()

    if (!crossroad) {
      return res.status(404).json({ error: 'No Crossroad found' })
    }

    res.status(200).json({ area })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.addCrossroad = async (req, res) => {
  const { name, areaId } = req.body
  try {
    const crossroad = await CrossRoad.findOne({
      name: name,
      areaId: areaId,
    }).exec()

    if (crossroad) {
      return res.status(400).json({
        error: 'Crossroad already added.',
      })
    }

    const _crossroad = new CrossRoad({ name, areaId })

    const data = await _crossroad.save()

    if (data) {
      return res.status(200).json({
        message: 'Crossroad added successfully.',
      })
    } else {
      return res.status(500).json({
        error: 'Something went wrong. Please try again.',
      })
    }
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}
