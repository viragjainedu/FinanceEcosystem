import sys
def add(n1,n2):
    n3=n1+n2
    print(n3)
    return sys.stdout.flush()
n1=sys.argv[1]
n2=sys.argv[2]
add(n1,n2)