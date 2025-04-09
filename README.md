a. Create a folder named ‘sample’ in your ‘home’ directory

  mkdir sample

b. Inside ‘sample’ folder, create a file called ‘sample.txt’

  touch sample.txt

c. Add the following content to the file: Hi! This is just a sample text file created using a shell script.

  echo "Hi! This is just a sample text file created using a shell script." > sample.txt

d. Print the contents of the file.

  cat sample.txt

e. Print the number of occurrences of letter ‘t’ in ‘sample.txt’

  grep -o sample.txt | wc -l

f. Change the owner's permissions to allow all the operations on the file. ( Read, Write, Execute )

  chmod u+rwx sample.txt

g. Write a command to append following content in sample.txt file: Hi! This is just another sample text added to the file.

  echo "Hi! This is just another sample text added to the file." >> sample.txt

h. Change the group permissions to allow only read operation.

  chmod g=r sample.txt

i. Change all users permission to deny any sort of access to ‘sample.txt’

  chmod 000 sample.txt

j. Write a command to create a file named sample2.txt with content similar to that of sample.txt

  cat sample.txt > sample2.txt

k. Add some random 1000 lines in the sample.txt file.

  head -c 20000 /dev/urandom | base64 | fold -w 20 > sample.txt

l. Write a command to print the top 50 lines of the file

  head -n 50 sample.txt

m. Write a command to print the bottom 50 lines of the file

  tail -n 50 sample.txt

n. Add 5 files in the same folder named: prog1.txt, prog2.txt, program.txt, code.txt, info.txt

  touch prog1.txt prog2.txt program.txt code.txt info.txt

o. Write the command to list files which have “prog” in its name

  ls | grep 'prog'

3. Create two files “a.txt” and “b.txt”. Write a command to get the difference between the contents in two files.

  touch a.txt b.txt diff a.txt b.txt

5. Create directories ./hello/world (World dir is inside hello dir) using mkdir command where neither hello or world exists. It should be a single command without the use of &&.

  mkdir -p /hello/world
