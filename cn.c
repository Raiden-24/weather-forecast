#include <stdio.h>
#include <stdlib.h>

int main (int argc, char** argv){
    int array[50];
    int i;
    int size;
    int count=0;
    int parity;
    printf("ENTER THE SIZE OF THE BIT STREAM : \n" );
    scanf ("%d",&size);
    printf("ENTER THE BIT STREAM : \n");
    for (i=0;i<size;i++){
        scanf ("%d",&array[i]);
    }
    for(i=0;i<size;i++)
    {
        printf("%d",array[i]);
    }
    for (i=0;i<size;i++){
        if (array[i]==1){
            count++;
        }
    }
    if (count%2==0){
        parity=0;
    }
        else {
            parity=1;
            } 
    printf("\nHENCE THE PARITY BIT IS : %d \n",parity);
    printf("THE FINAL BIT STREAM IS : \n");
    for (i=0;i<size;i++){
        printf("%d",array[i]);
       
    }
     printf("%d",parity);

    return EXIT_SUCCESS;

}