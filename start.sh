# #!/bin/bash

# # Start the server in the background
# (cd server && npm run build && npm start) &

# # Wait for the server to start
# sleep 2

# # Start the client
# cd client && npm start

#!/bin/bash

# Start the client and server concurrently
npm run start-c &
npm run start-s
