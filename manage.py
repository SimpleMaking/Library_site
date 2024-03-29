# import mimetypes
# mimetypes.add_type('text/javascript', '.js', True)
# mimetypes.add_type('text/css', '.css')
import os
from app import create_app, socketio


app = create_app(os.getenv('FLASK_CONFIG') or 'default')
if __name__ == '__main__':    
    socketio.run(debug=True, app=app)
    
 
