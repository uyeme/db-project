// crudRoutes.js
const createCrudRoutes = (app, path, model) => {

    // Create a new record
    app.post(`/${path}`, async (req, res) => {
        try {
            const newRecord = await model.create(req.body);
            res.status(201).json(newRecord);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // Fetch all records
    app.get(`/${path}`, async (req, res) => {
        try {
            const records = await model.findAll();
            res.json(records);
        } catch (err) {
            res.status(500).json({ error: `Failed to fetch records: ${err.message}` });
          }
    });

    // Fetch a single record by ID
    app.get(`/${path}/:id`, async (req, res) => {
        try {
            const record = await model.findByPk(req.params.id);
            if (record) {
                res.json(record);
            } else {
                res.status(404).json({ error: 'Record not found' });
            }
        } catch (err) {
           res.status(500).json({ error: `Failed to fetch records: ${err.message}` });

        }
    });

    // Update an existing record by ID
    app.put(`/${path}/:id`, async (req, res) => {
        try {
            const updated = await model.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated[0] > 0) {
                res.json({ message: 'Record updated successfully' });
            } else {
                res.status(404).json({ error: 'Record not found' });
            }
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // Delete a record by ID
    app.delete(`/${path}/:id`, async (req, res) => {
        try {
            const deleted = await model.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                res.json({ message: 'Record deleted successfully' });
            } else {
                res.status(404).json({ error: 'Record not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

module.exports = createCrudRoutes;
