def get_time():
    from datetime import datetime
    time = datetime.now().hour
    if time < 12:
        return "morning"
    elif time < 17:
        return "afternoon"
    else:
        return "night"