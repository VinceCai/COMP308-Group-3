const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DailyTipsSchema = new Schema({
    nurse: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
	patient: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    title:{
        type: String,
        required:true
    },
    content:{
        type: String
    },
    // motivational video url in youtube
    video_url:{
        type: String
    },
    start_date:{
        type: Date,
        // expired start date
        default: Date.now
    },
    end_date:{
        type: Date,
        // expired end date
        default: Date.now
    },
    post_time:{
        type: Date,
        // Create a default 'report_time' value
        default: Date.now
    }
})

module.exports =  mongoose.model('DailyTips', DailyTipsSchema)