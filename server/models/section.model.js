const mongoose = require('mongoose');
const SubSection = require('./subSection.model'); //

const sectionSchema = new mongoose.Schema({
    sectionName:{
        type: String,
        required: true,
        trim: true,
    },
    subSections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubSection',
        required: true,
    }]
});

const Section = mongoose.model('Section', sectionSchema);
module.exports = Section;
