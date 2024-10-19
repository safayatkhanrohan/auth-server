exports.signUp = async (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json({
          success: true,
          message: "User created",
        });
    } catch (error) {
        
    }
}