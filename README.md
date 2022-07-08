# TicketCounter App does the following functionalities:

# Backend api : Node.js(Typescript)

# Frontend    : React(Typescript)

1.	This system have two separate views, one for a counter manager and the other for customers.

2.	The customer View: (https://nithya-ticket-counter.herokuapp.com/)
    
    a.	Take a Number: Allows the customer to take a ticket. When the button is clicked, the system generates a ticket number and displays to the customer.
    
    b.	Now Serving: Shows the latest number to be removed from the waiting queue and added to a counter.
    
    c.	Last Number: Shows the latest ticket number to be issued.
    
    d.	Counters:
    
        i.	The green dots: shows serving status – green is counter is online but not currently serving any customer, red if counter is online and currently serving a customer.
        
        ii.	<cur_num>: shows the number of the current ticket being served. If they counter is offline, the value of <cur_num> will be “Offline”, the status color changed to grey, and the whole counter will be greyed out (disabled).

3.	Counter Management: (https://nithya-ticket-counter.herokuapp.com/CounterManagement)
    
    a.	Go Offline: This button shows “Go Offline” if the counter is online, and shows “Go Online” if the counter is offline. Toggles counter status when clicked. When offline, counter status on customer view will be grey, and the counter will be disabled in the customer view only.
    
    b.	“Complete Current”: Marks the current ticket being served as complete. When clicked, the current counter status becomes available, and the status on the Customer View will turn to green.
    
    c.	Call Next: Will 
        
        i.	Pick up the next first-in ticket from the waiting queue.
        
        ii.	Update <cur_num> in the customer view to the same ticket number (on the corresponding counter).
        
        iii.	Change the counter status (customer view) to red.
        
        iv.	Display a message “No tickets in the waiting queue” if there are no more tickets to serve.
        
Note:

1.	Built a backend application with socket to manage the queues, so that both views can be run simultaneously on separate browsers.

2.	Did not implement login or authentication. Assume only one user.

3.	Hosted the application in Heroku.
