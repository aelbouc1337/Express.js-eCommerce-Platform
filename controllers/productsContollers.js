exports.test = (req,res) => {
    const h = req.params.id;
    res.send(h)
}