from datetime import datetime

context = {
    'time': datetime.now().hour,
    'tablets' : [
        {'name':'one','status':'No'},
        {'name':'two','status':'No'},
        {'name':'three','status':'No'}
                ]
    }
data = []
con={}
for tab in context['tablets']:
    data.append(tab)
    print(data)

print("###########")
con['data'] = data
print(con)
