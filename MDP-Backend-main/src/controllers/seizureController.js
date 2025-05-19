const Seizure = require("../models/seizure");

// Create a new seizure record
exports.createSeizure = async (req, res) => {
  try {
    const {
      seizure_day,
      seizure_type,
      seizure_duration,
      aura_symptoms,
      postical_symptoms,
    } = req.body;

    const seizure = new Seizure({
      userId: req.user._id,
      seizure_day: new Date(seizure_day), // ✅ explicitly convert
      seizure_type,
      seizure_duration,
      aura_symptoms,
      postical_symptoms,
    });

    await seizure.save();

    res.status(201).json({ message: 'Seizure record created successfully', seizure });
  } catch (error) {
    console.error('❌ Backend error:', error);
    res.status(400).json({ error: error.message });
  }
};


exports.getSeizureLoggedDays = async (req, res) => {
  try {
    const seizures = await Seizure.find({ userId: req.user._id }).select('seizure_day');

    const loggedDates = seizures
      .filter(seizure => seizure.seizure_day)
      .map(seizure =>
        new Date(seizure.seizure_day).toISOString().split('T')[0]
      );

    res.status(200).json({ loggedDates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get a specific seizure record by ID (only if it belongs to the authenticated user)
exports.getSeizureById = async (req, res) => {
  try {
    const seizure = await Seizure.findOne({ _id: req.params.id, userId: req.user._id });
    if (!seizure) {
      return res.status(404).json({ message: "Seizure record not found" });
    }
    res.status(200).json(seizure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a seizure record by ID (only if it belongs to the authenticated user)
exports.updateSeizure = async (req, res) => {
  try {
    const seizure = await Seizure.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!seizure) {
      return res.status(404).json({ message: "Seizure record not found" });
    }
    res.status(200).json({ message: "Seizure record updated successfully", seizure });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a seizure record by ID (only if it belongs to the authenticated user)
exports.deleteSeizure = async (req, res) => {
  try {
    const seizure = await Seizure.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!seizure) {
      return res.status(404).json({ message: "Seizure record not found" });
    }
    res.status(200).json({ message: "Seizure record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSeizuresForUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const seizures = await Seizure.find({ userId }).sort({ seizure_day: -1 });

    res.status(200).json(seizures); // ← list of seizure objects
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

