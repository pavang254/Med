def get_time():
    from datetime import datetime
    time = datetime.now().hour
    if time < 12:
        return "morning"
    elif time < 16:
        return "afternoon"
    else:
        return "night"