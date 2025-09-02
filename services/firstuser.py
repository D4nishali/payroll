#include<stdio.h>
int main(){
    int bt[20], wt[20], tat[20], i, n;
    float awt=0, atat;
    printf("Enter no of proc: ");
    scanf("%d", &n);
    for(i=0;i<n;i++){
        printf("Enter bt of procc %d: ", i);
        scanf("%d", &bt[i]);
    }
    wt[0] = 0;
    tat[0] = bt[0];
    atat = tat[0];
    for(i=1;i<n;i++){
        wt[i] = wt[i-1] + bt[i-1];
        tat[i] = tat[i-1] + bt[i];
        awt = awt + wt[i];
        atat = atat + tat[i];
    }
    printf("Proc \t BT \t WT \t TAT");
    for(i=0;i<n;i++){
        printf("\nP%d \t\t %d \t\t %d \t\t %d", i,bt[i],wt[i],tat[i]);
    }
    printf("\nAWT: %f", awt/n);
    printf("\nATAT: %f", atat/n);
}
