#include <stdio.h>
int main() {
    int i, j, n, bt[10], wt[10], tat[10], ct[10], q, max;
    float awt = 0, att = 0, temp = 0;
    printf("Enter the number of processes: ");
    scanf("%d", &n);
    for (i = 0; i < n; i++) {
        printf("Enter Burst Time for Process %d: ", i + 1);
        scanf("%d", &bt[i]);
        ct[i] = bt[i];
    }
    printf("Enter the Time Quantum: ");
    scanf("%d", &q);
    max = bt[0];
    for (i = 1; i < n; i++) {
        if (max < bt[i]) {
            max = bt[i];
        }
    }
    for (j = 0; j < (max / q) + 1; j++) {
        for (i = 0; i < n; i++) {
            if (bt[i] != 0) {
                if (bt[i] <= q) {
                    tat[i] = temp + bt[i];
                    temp += bt[i];
                    bt[i] = 0;
                } else {
                    bt[i] -= q;
                    temp += q;
                }
            }
        }
    }
    for (i = 0; i < n; i++) {
        wt[i] = tat[i] - ct[i];
        att += tat[i];
        awt += wt[i];
    }
    printf("\nPROCESS \tBURST TIME \tWAITING TIME \tTURNAROUND TIME\n");
    for (i = 0; i < n; i++) {
        printf(" P%d \t\t\t %d \t\t\t %d \t\t\t %d\n", i + 1, ct[i], wt[i], tat[i]);
    }
    printf("\nThe Average Turnaround Time is: %.2f", att / n);
    printf("\nThe Average Waiting Time is: %.2f\n", awt / n);
    return 0;
}
