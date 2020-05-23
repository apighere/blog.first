# c基础（下）

## 6. 函数

### 6.1 函数概述

* 函数是 C 程序的基本模块，是用于完成特定任务的程序代码单元

* 函数可分为系统函数和用户定义函数两种

* 函数的作用
    * 函数的使用可以省去重复代码的编写，降低代码重复率
    * 函数可以让程序更加模块化，从而有利于程序的阅读，修改和完善

### 6.2 函数定义与声明

* 函数定义语法

    ```c
    int min(int a,int b)  //int为返回值类型，形参列表变量间用“，”隔开
    {
        int c =0;         
        if(a<b)
            c=a;
        else
            c-b;
        retrun 0;         //返回值的类型要对应开头
    }
    ```

* 函数声明

    * 自定义函数与主函数不在同一文件中，或函数定义的位置在主函数后，需先声明
    * 函数声明语法

    ```c
    int max(int x, int y); 
    int max(int, int);
    ```

### 6.3 函数形参与实参

* 形参出现在函数定义中，在整个函数体内都可以使用，离开该函数则不能使用
* 实参出现在主调函数中，进入被调函数后，实参也不能使用
* 实参可以是常量、变量或表达式
* 无论实参是何种类型的量，进行函数调用时都必须具有确定的值，以便把这些值传送给形参

### 6.4 函数的返回值

* 如果函数定义没有返回值，函数调用时不能写 void 关键字，也不能接收函数的返回值

    ```c
    void test()
    {
    }
    
    int main()
    {
    	test(); // right
    	void test(); // error, void关键字只能出现在定义
    	int a = test();	// error, 函数定义根本就没有返回值
    
    	return 0;
    }
    ```

* 如果函数定义有返回值，这个返回值可不用，但如需使用则需定义一个匹配类型的变量来接收

### 6.5 return和exit

* 

### 6.6 多文件编程

* 防止头文件重复包含报错

    * 推荐使用标准方法

    ```c
    #ifndef __HEAD_H__
    #define __HEAD_H__
    
    ...
    
    #endif
    ```

    * 内容：#include、宏定义、函数声明、类型定义(结构体类型)、全局变量定义

    ```c
    #ifndef _HEAD_H_
    #define _HEAD_H_
    
    //#include
    #include <stdio.h>
    #include <string.h>
    #include <stdlib.h>
    #include <math.h>
    #include <time.h>
    
    // 函数声明
    int sub(int a, int b);
    int mul(int a, int b);
    int dive(int a, int b);
    
    // 宏定义
    //#define PI 3.14
    
    #endif
    ```

    

## 7. 指针

### 7.1 指针概述

* 指针：指针是内存单元的编号，地址的占位符为p%

    * 内存单元，每个内存单元都有唯一的编号（数），称这个内存单元的编号为地址
    * 指针变量，是存放地址的变量
    * 通常我们叙述时会把指针变量简称为指针，实际他们含义并不一样
    * 指针的大小，指针的大小与类型无关只与平台有关，==32位4字节64位8字节==

* 指针的定义和使用

    ```c
    int a=10;
    int * P=&a;//定义一个指针变量p，保存a的地址，赋值要用取地址符&
    //此处的int*为指针类型
    
    *p=20;//通过指针*p修改a变量的地址而修改a变量的值
    //此处的*为间接引用运算符，解引用运算符
    ```

    * &不能取寄存器变量，因为寄存器变量在 CPU 里面，是没有地址的

### 7.2 空指针与野指针

* 空指针和野指针不允许使用

    * 野指针：

    ```c
    int *p;			// 指针定义后，没有指定地址
    *p = 2000;
    
    int *p = 10;   // 有初始值，但该值是不可访问的内存地址	
    *p = 2000;
    ```

    * 空指针：

    ```c
    int *p = NULL;	// #define NULL ((void *)0)，0号地址不允许使用
    *p = 2000;
    
    //NULL == 0 == '\0'，0号地址被宏定义为NULL
    ```

    

### 7.3 万能指针

* 可以接收任意一种类型的变量地址，常用于对指针变量赋值初值

* 使用时，必须强转为具体数据类型才能使用

    ```c
    char ch ='R';
    void * p=&ch;
    print("%c\n", *(char *)p);
    ```

### 7.4 指针与const

* 指针修改const修饰的普通常量

    ```c
    int main(void)
    {
    	const int a = 10;
        //直接a=100;会出错
    	int* p = &a;
    	*p = 100;
    	printf("%d\n", *p);
    	return 0;
    	
    }
    ```

* 修饰指针常量

    ```c
    const int *p;	// 可以修改 p，不可以修改 *p
    
    int main (void)
    {
        int a = 10;
    	int b = 20;
    
    	const int* p = &a;  
    	printf("*p = %d\n", *p);	
        
    	p = &b;		// 修改 p，保存b的地址，不受 cosnt 影响。
    	printf("*p = %d\n", *p);	
    
    	//*p = 1000; 会报错，由于 const修饰右边的整个*p,所以*p为只读 
    }
    
    ```

* const向右修饰变量，被修饰部分为只读

    ```c
    int * const p;  // 不可以修改 p， 可以修改 *p
    ```


### 7.5 多级指针 

* 多级指针定义不能跳跃定义，必须逐级定义，三级以上指针通常不使用，出来考试

    ```c
    int a = 10;
    int *p = &a;   	// 一级指针，int 变量的地址
    int **pp = &p;    // 二级指针，一级指针的地址
    int ***ppp = &pp;	// 三级指针，二级指针的地址
    ......
    //则
    ppp == &pp;		// 三级指针
    *ppp == pp == &p;		// 二级指针
    **ppp == *pp == p == &a  	// 一级指针
    ***ppp == **pp == *p == a   	// 普通整型变量 
    ```

### 7.6 指针和数组

* 数组名为地址常量，不能被带有副作用的运算符运算/修改，如++、--、=、+=、*=等

* 指针和数组名

    ```c
    int a[3]={1,2,3};
    int * p=a;   //将数组的首地址赋值给整型指针变量p，a为常量不能被赋值，可以用于赋值
    a[i]==*(a+i)=p[i]=*(p+i)
    ```

    * 指针和数组名的区别，通常叙述的“指针”指的是“指针变量”
        1. 指针是变量，数组名是常量不可修改
        2. 变量的大小不一样，指针必为4/8

* 取数组元素a[i]==*(a+i)的代码测试

    ```c
    int main ()void
    {
        int[3]={1,2,3};
    	printf("a[1]=%d\n",a[1]);
    	printf("*(a+1)=%d\n",*(a+1));
        return 0;
    }
    
    ```


### 7.7 指针的运算

* 不同数据类型的指针

    ```c
    int main(void)
    {
    	int a = 0x12345678;
        
    	//int* p = &a;		// 输出 0x12345678
    
    	//short* p = &a;	// 输出 0x5678
    
    	char* p = &a;		// 输出 0x78
    
    	printf("*p = %#x\n", *p); 
    
    	system("pause");
    	return 0;
    }
    ```

* 不同数据类型对指针的影响

    * 在使用间接引用时，决定了指针从存储的地址开始向后读取的字节数

    ```c
    int main(void)
    {
    	int a = 10;
    	//int* p = &a;		// P+1，较原始p偏 4 字节
    	//short* p = &a;	// P+1，较原始p偏 2 字节
    	char* p = &a;		// P+1，较原始p偏 1 字节
    
    	printf("p = %p\n", p);   // 打印 p 的值(地址)
    	printf("p+1 = %p\n", p+1);   // 打印 p+1 的值(地址)
    
    	return 0;
    }
    ```

* 在数组中 +-整数

    ```c
    int arr[] = {1,2,4,5,8};
    int *p = arr;
    p+3;	// 向后（右）偏过 3 个元素（12字节）
    p-2;	// 向前（左）偏过 2 个元素（8字节）
    ```

    * 设\*q为数组第一个元素\*p后2个的元素，则q=p+2，即q-p=2
    * 练习，使用指针+-整数的方法，给空数组连续赋值，再使用指针挪移的方法打印

    ```c
    #define _CRT_SECURE_NO_WARNINGS
    #include <stdio.h>
    #include <string.h>
    #include <stdlib.h>
    #include <math.h>
    #include <time.h>
    
    
    int main(void)
    {
    	int arr[10] = { 0 };
    	int n = sizeof(arr) / sizeof(arr[0]);
    	int* p = arr;
    
    	for (size_t i = 0; i < n; i++)
    	{
    		*(p + i)=i;
    	}
    
    	for (size_t i = 0; i < n; i++)
    	{
    		printf("%d", *p);
    		p++;
    	}
    	return 0;
    }
    ```

    * 练习，指针实现函数strlen（）

    ```c
    // 借助 数组方式实现
    int mystrlen(char str[])
    {
    	int i = 0;
    	while (str[i])
    	{
    		i++;
    	}
    	return i;
    }
    
    // 借助指针++方式实现
    int mystrlen2(char str[])
    {
    	char* p = str;
    	while (*p)		// while(*p != '\0') == while(*p != 0)
    	{
    		p++;
    	}
    	return p-str;    // 返回数组元素的有效个数。
    }
    
    int main(void)
    {
    	char str[] = "hello hoho";
    	printf("%d\n", mystrlen2(str));
    
    	return 0;
    }
    ```


* 指针间的相互运算，除了-，指针的*/%和+都是会报错的

    * 普通变量的指针相减，语法正确但无意义
    * 数组对应的指针相减， 得到偏移过的元素个数(向右为+，向左为-)

    ```c
    int main(void)
    {
    	int arr[10]={1,2,3,4,5,6,7,8,9,0};
        int * p=&arr[2];
        
        printf("p-arr=%d\n",p-arr);
        
        int * q=&arr[8];
        printf("q-p=%d\n",q-p);
        
        return 0;
    }
    ```

* 指针的比较运算

    * 普通指针变量比较。 语法允许，无实际意义
    * 数组对应的指针比较大小， 可以得到元素存储的先后顺序

    ```c
    int main(void)
    {
    	int arr[] = { 1,2,4,5,6,7,9 };
    	int* p = &arr[1];
    
    	if (p > arr)
    		printf("成立\n");
    	else if (p < arr)
    		printf("不成立\n");
    	else
    		printf(" == \n");
    
    	system("pause");
    	return EXIT_SUCCESS;
    }
    ```

    * 判断指针是否为NULL

    ```c
    int main(void)
    {
    	int* p;
    	p = NULL;   // 这两行等价于 int *p = NULL;
    
    	if (p == NULL)
    		printf("p == NULL\n");
    	else 
    		printf("p != NULL\n");
    
    	system("pause");
    	return EXIT_SUCCESS;
    }
    ```

### 7.8 指针和函数

* 栈帧

    * 函数被调用时，系统会在 stack（栈）上，申请一块内存区域来供函数调用
    * 当函数调用结束时，栈上存放的形参和局部变量这块栈帧会被自动释放

* 传值和传址

    * 传值，只修改了变量的值，不会传导到函数外

    ```c
    // swap1 函数，交换两个数 —— 传值
    int swap1(int a, int b)
    {
    	int temp = a;
    	a = b;
    	b = temp;
    	printf("在 swap1 内：a=%d, b=%d\n", a, b);
    }
    int main(void)
    {
    	int m = 10;
    	int n = 33;
    
    	// 函数调用，实参m，赋值给形参 a；实参n，赋值给形参 b
    	swap1(m, n);
    
    	printf("在 main 内：m=%d, n=%d\n", m, n);
    
    	return EXIT_SUCCESS;
    }
    
    ```

    * 传址，修改了变量的址，会传导到函数外

    ```c
    int swap2(int *a, int *b)
    {
    	int temp = *a;
    	*a = *b;
    	*b = temp;
    	printf("在swap2 内：*a=%d, *b=%d\n", *a, *b);
    }
    int main0102(void)
    {
    	int m = 10;
    	int n = 33;
    
    	// 函数调用，实参m，赋值给形参 a；实参n，赋值给形参 b
    	swap2(&m, &n);
    
    	printf("在 main 内：m=%d, n=%d\n", m, n);
    
    	return EXIT_SUCCESS;
    }
    ```

* ==数组名做函数参数==

    ```c
    #include <stdio.h>
    
    void printArrary(int *a, int n)	
    {
    	int i = 0;
    	for (i = 0; i < n; i++)
    	{
    		printf("%d, ", a[i]);
    	}
    	printf("\n");
    }
    
    int main()
    {
    	int a[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
    	int n = sizeof(a) / sizeof(a[0]);
    
    	//数组名做函数参数
    	printArrary(a, n); 
    	return 0;
    }
    ```

    * 传递的不再是整个数组而是数组的首地址（指针），sizeof 为4/8
    * 当整型数组做函数参数时，通常封装两个参数，数组首地址与数组的元素个数


* 指针做函数返回值

    * 指针做函数的返回值时，不能返回放在栈上的局部变量的地址值
    * C语言中，数组不允许做函数返回值，只能写成指针形态

    ```c
    int [] test_ret(int a)//会报错
    //只能写成
    int * test_ret(char str[])
    ```


### 7.9 指针和字符串

* char []与char*

    * 保存变量地址，同一个字符串，地址值不同，元素可以被赋值

    * char * 保存常量地址，同一个字符串，地址值相同，元素无法被赋值

    ```c
    char str1[] = {'h','i','\0'};   // 变量，可读可写
    char str2[] = "hi";		// 变量，可读可写
    char *p1 = "hi";		// "hi"为常量，只读
    char *p2 = {'h','i','\0'};   // 错误定义
    
    char str[] = "hello world";
    char* p = str;
    *p = 'm';
    
    p = "hello world";
    *p = m';                 //会报错
    printf("%s\n", p);
    ```

    * 当字符串做函数参数时，不需要两个参数，因每个字符串都有 \0

* 小结

    | 定义        | 说明                                         |
    | ----------- | -------------------------------------------- |
    | int *p      | 定义一个指向int的指针变量                    |
    | int a[10]   | 定义一个有10个元素的数组，每个元素类型为int  |
    | int *p[10]  | 定义一个有10个元素的数组，每个元素类型为int* |
    | int func()  | 定义一个函数，返回值为int型                  |
    | int *func() | 定义一个函数，返回值为int *型                |
    | int **p     | 定义一个指向int的指针的指针，二级指针        |



## 8. 内存管理

### 8.1 作用域

* C语言变量的作用域分为
    * 代码块作用域(代码块是{}之间的一段代码)
    * 函数作用域
    * 文件作用域

### 8.2 局部变量与静态局部变量

* 局部变量也叫auto自动变量(auto可不写)

    * 在一个函数内或复合语句中定义，只在函数范围或复合语句中内有效
    * 随着函数调用的结束或复合语句的结束局部变量的声明声明周期也结束
    * 如果没有赋初值，内容为随机

    ```c
    #include <stdio.h>
    
    void test()
    {
    	auto int b = 10; 
    }
    
    int main(void)
    {
    	b = 100; //报错
    	if (1)
    	{
    		int a = 10;
    		printf("a = %d\n", a);
    	}
    	a = 10;  //报错
    	return 0;
    }
    ```

* 静态局部变量

    * 定义语法

    ```c
    static int k = 99；
    ```

    * 特性
        * static局部变量的作用域也是在定义的函数内有效
        * static局部变量生命周期为程序运行周期，staitc局部变量只能初始化一次，赋值多次
        * static局部变量若未赋初值，则系统自动赋值，数值型赋初值0，字符型赋空字符

    ```c
    #include <stdio.h>
    
    void fun1()
    {
    	int i = 0;
    	i++;
    	printf("i = %d\n", i);
    }
    
    void fun2()
    {
    	//静态局部变量，没有赋值，系统赋值为0，而且只会初始化一次
    	static int a;
    	a++;
    	printf("a = %d\n", a);
    }
    
    int main(void)
    {
    	fun1();
    	fun1();
    	fun2();
    	fun2();
    	
        printf("a = %d\n", a);//报错
        
    	return 0;
    }
    ```

### 8.3 全局变量与静态全局变量

* 全局变量特性
    * 定义在函数外部的变量
    * 从定义位置开始，默认到本文件结束
    * 如果其他文件，想使用该全局变量，可以通过extern声明将作用域导出到对应文件中
    * 不同文件的全局变量不可重名
* 静态全局变量特性
    * 在函数外定义，作用范围被限制在所定义的文件中，不能通过extern声明导出
    * 不同文件静态全局变量可以重名，但作用域不冲突
    * static 全局变量的生命周期和程序运行周期一样，staitc 全局变量的值只初始化一次
* 全局函数和静态函数
    * C 语言中函数默认都是全局的，使用关键字 static 可以将函数声明为静态函数
    * 函数定义为 static 就意味着这个函数只能在定义这个函数的文件中使用

### 8.4 小结

* 允许在不同的函数中使用相同的变量名，它们代表不同的对象，分配不同的单元，互不干扰

* 同一源文件中，允许全局变量和局部变量同名，在局部变量的作用域内，全局变量不起作用

* 所有的函数默认都是全局的，程序内的函数不能重名，static函数则是文件级的，可以重名

    | 类型           | 作用域   | 生命周期       |
    | -------------- | -------- | -------------- |
    | auto变量       | 一对{}内 | 当前函数       |
    | static局部变量 | 一对{}内 | 整个程序运行期 |
    | extern变量     | 整个程序 | 整个程序运行期 |
    | 全局变量       | 整个程序 | 整个程序运行期 |
    | static全局变量 | 当前文件 | 整个程序运行期 |
    | extern函数     | 整个程序 | 整个程序运行期 |
    | static函数     | 当前文件 | 整个程序运行期 |
    | register变量   | 一对{}内 | 当前函数       |

### 8.5 内存四区

* 代码区
    * 存放程序的二进制代码，为只读
* stack栈
    * 给函数调用提供内存空间（栈帧）
    * 系统自动分配和释放
    * win平台1-10m，Linux平台8-16m
    * 先进后出
* 数据区
    * data：数据区
        * 存放初始化为非0的全局变量
        * 存放初始化为非0的静态变量（静态局部、静态全局）
    * rodata：只读数据区
        - 常量、只读全局数据
    * bss：未初始化数据区
        - 存放初始化为0的全局变量
        - 未初始化的全局、静态变量（静态局部、静态全局）
* heap堆
    * 给用户自定义数据体提供内存空间，32位系统约1.3g
* 其它存储位置

| 类型         | 存储位置              |
| ------------ | --------------------- |
| extern函数   | 代码区                |
| static函数   | 代码区                |
| register变量 | 运行时存储在cpu寄存器 |
| 字符串常量   | data段                |

### 8.6 heap堆区的使用

* malloc()

    ```c
    #include <stdlib.h>
    void *malloc(size_t size);
    
    //size：需要分配内存大小(单位：字节)
    //成功：返回分配空间的起始地址
    //失败：返回NULL
    ```

    * 在堆区中申请一块长度为size字节的连续区域，一般使用memset初始化

    ```c
    #include <stdlib.h> 
    #include <stdio.h>
    #include <string.h>
    
    int main()
    {
    	int count, *arr, n;
    	printf("请输入要申请数组的个数:\n");
    	scanf("%d", &n);
    
    	arr = (int *)malloc(n * sizeof (int));
    	if (arr == NULL)
    	{
    		printf("申请空间失败!\n");
    		return -1;
    	}
    	//将申请到空间清0
    	memset(arr, 0, sizeof(int)*n);
    
    	for (count = 0; count < n; count++) //给数组赋值
    		arr[count] = count;
    
    	for (count = 0; count < n; count++) //打印数组元素
    		printf("%2d", arr[count]);
    	
    	free(arr);
        arr=NULL;           //释放后要置为空
        
    	return 0;
    }
    ```

* free()

    ```c
    #include <stdlib.h>
    void free(void *ptr);
    
    //需要释放空间的首地址，被释放区应是由malloc函数所分配的区域
    //无返回值
    ```

    * 释放ptr所指向的一块内存空间，ptr是一个任意类型的指针变量，指向首地址
    * 对同一内存空间多次释放会出错，释放后应将其置为NULL，则多次释放不会报错

### 8.7 二级指针对应的 heap 空间

* int **p = int *p[3]  ==> [int *, int *, int *]   ==> [ [1, 2, 3, 54, 5] , int *, int *]

    * 申请内存：先申请外层空间，再申请内层空间
    * 释放内存：先释放内存空间，在释放外层空间

    ```c
    // 先申请外层指针。
    char **p = malloc(sizeof(char *) * 5);
    // 申请内层指针
    for (int i = 0; i<5; i++)
    {
        p[i] = malloc(sizeof(char) * 10);  // 字符串长度 <= 10个字符。
    }
    // 写
    for (int i = 0; i<5; i++)
    {
        // p[i] = "hello";	错误！
        strcpy(p[i],"hello");
    }
    // 释放内层
    for (int i = 0; i<5; i++)
    {
        free(p[i]);
        p[i] = NULL;
    }
    // 释放外层
    free(p);
    p = NULL;
    ```

### 8.8 内存操作函数

* memset()

    ```c
    #include <string.h>
    void *memset(void *s, int c, size_t n);
    
    //s：需要操作内存s的首地址
    //c：填充的字符，c虽然参数为int，但必须是unsigned char，范围为0~255
    //n：指定需要设置的大小
    //返回值：s的首地址
    ```

    * 将s的内存区域的前n个字节以参数c填入

    ```c
    int a[10];
    
    memset(a, 0, sizeof(a));
    memset(a, 97, sizeof(a));
    int i = 0;
    for (i = 0; i < 10; i++)
    {
    	printf("%c\n", a[i]);
    }
    ```

* memcpy()

    ```c
    #include <string.h>
    void *memcpy(void *dest, const void *src, size_t n);
    
    //dest：目的内存首地址
    //src：源内存首地址，注意：dest和src所指的内存空间不可重叠，可能会导致程序报错
    //n：需要拷贝的字节数
    //返回值：dest的首地址
    ```

    * 以字节为单元拷贝内存，拷贝src所指的内存内容的前n个字节到dest所值的内存地址上

    ```c
    int a[10] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
    int b[10];
    	
    memcpy(b, a, sizeof(a));
    int i = 0;
    for (i = 0; i < 10; i++)
    {
    	printf("%d, ", b[i]);
    }
    printf("\n");
    
    memcpy(&a[3], a, 5 * sizeof(int)); //可能报错e，内存重叠
    
    ```

* memmove()

    ```c
    #include <string.h>
    void *memmove(void *dest, const void *src, size_t n);
    ```

    * 以字节为单元拷贝内存，作用与memcpy()相同，比memcpy()安全
    * 拷贝的 src 和 dest 之前如果有重叠，memcpy()有可能报错，使用 memmove()不会

* memcmp()

    ```c
    #include <string.h>
    int memcmp(const void *s1, const void *s2, size_t n);
    
    //s1：内存首地址1
    //s2：内存首地址2
    //n：需比较的前n个字节
    
    //相等：=0
    //大于：>0
    //小于：<0
    ```

    * 以字节为单位比较内存，比较s1和s2所指向内存区域的前n个字节



## 9. 复合类型

### 9.1 结构体

* 结构体概述
    * 一组具有相同类型数据的有序集合，用于处理大量相同类型的数据运算
    * 将不同类型的数据组合成一个有机的整体，方便管理
    * 通常结构体类型定义在全局位置，或者放到xxx.h头文件

* 定义语法

    ```c
    //结构体类型的定义
    struct stu  //struct stu是结构体的类型，相当于int char char*
    {
    	char name[50];
    	int age;
    };
    struct stu s1 = { "mike", 18 };//再定义变量struct stu类型的变量a
    
    
    //定义类型同时定义变量
    struct stu2
    {
    	char name[50];
    	int age;
    }s2 = { "lily", 22 };
    
    struct
    {
    	char name[50];
    	int age;
    }s3 = { "yuri", 25 };
    ```

* 结构体成员的访问与修改，使用“.”访问成员

    ```c
    struct stu
    {
    	int age;
    	int num;
        char name[50];
    };
    struct stu s1 = {18, 1, "Andy"};//不使用"."访问赋值要对应顺序
    
    printf("s1:age = %d, name = %s, num = %d\n", s1.age, s1.name, s1.num);
    
    struct stu s2;
    s2.age = 118;
    s2.num = 119;
    //stu.name = "cuihua";  // name为地址常量，不能被赋值
    strcpy(s2.name, "cuihua");
    
    printf("s2:age = %d, name = %s, num = %d\n", s2.age, s2.name, s2.num);
    
    //普通变量使用"->"访问成员（不常用）
    (&stu)->age = 118;
    (&stu)->num = 119;
    ```

* 非常规定义语法（了解）

    ```c
    struct student {
        int age;		
        int num;
        char name[10];
    }s1, *s2;	// 定义结构体类型的同时，定义1个结构体变量 s1，一个指针变量s2
    
    struct {		// 匿名结构体
        int age;		
        int num;
        char name[10];
    }s3, *s4; // 定义匿名结构体类型的同时，定义1个结构体变量 s3，一个指针变量s4
    		  // 无法再定义其他变量。
    ```

### 9.2 结构体指针变量

* 定义语法

    ```c
    struct student *p1, *p2, *P3;  // 一次定义3个指针变量，此处为野指针
    
    //避免野指针、空指针
    struct student stu, *p1; //一次定义两个结构体变量，普通变量stu，指针变量p1
    p1 = &stu;  // 给指针初始化
    
    //申请heap堆空间给p1使用
    struct student *p1; 
    p1 = (struct student *)malloc(sizeof(struct student));
    
    //指针使用 "." 访问成员（不常用）
    (*p1).age = 18;
    strcpy((*p1).name, "cuihua");
    (*p1).num = 119;
    ```

### 9.3 结构体数组

* 所谓结构体数组，是指数组中的每个元素都是一个结构体

    ```c
    struct student {
        int age;		
        int num;
        char name[10];
    };
    struct student stu[5] = {{18, 1, "Andy"}, {19, 2, "Lucy"}, {118, 3, "李四"}};
    int n = sizeof(stu) / sizeof(stu[0]);
    for (int i = 0; i<n; i++)
    {
        printf("age=%d,num=%d,name=%s\n", stu[i].age, stu[i].num, stu[i].name);
    }
    
    //直接定义指针变量当数组用struct student *stu
    struct student *stu;	// 野指针
    
    // 得到的heap堆空间，当成数组使用
    stu = malloc(sizeof(struct student)*3);  // 等价于 struct student stu[3];
    
    // 给数组的第1个元素赋值
    stu[0].age = 11;
    stu[0].num = 111;
    strcpy(stu[0].name, "aaa");
    
    // 给数组的第2个元素赋值
    stu[1].age = 22;
    stu[1].num = 222;
    strcpy(stu[1].name, "bbb");
    
    // 给数组的第3个元素赋值
    stu[2].age = 33;
    stu[2].num = 333;
    strcpy(stu[2].name, "ccc");
    
    //int n = sizeof(stu) / sizeof(stu[0]);  // 不能求元素个数
    
    for (int i = 0; i < 3; i++)
    {
        printf("age=%d,num=%d,name=%s\n", stu[i].age, stu[i].num, stu[i].name);
    }
    
    free(stu);
    stu = NULL;
    ```

### 9.4 结构体嵌套

* 结构体内套结构体

    ```c
    #include <stdio.h>
    #include <string.h>
    
    
    struct person {
    	int age;
    	char name[10];
    };  // 类型
    
    struct student {
    	struct person man;	// person 类型的变量，作为 student 类型成员。
    	int id;
    	char addr[100];
    };
    
    int main(void)
    {
    	struct student stu = { 18, "zhaoliu", 1, "北京朝阳区" };
    
    	printf("age = %d\n", stu.man.age);
    	printf("name = %s\n", stu.man.name);
    	printf("addr = %s\n", stu.addr);
    
    	// 修改
    	stu.man.age = 119;
    	strcpy(stu.man.name, "张三丰");
    	strcpy(stu.addr, "武当山");
    
    	printf("\nage = %d\n", stu.man.age);
    	printf("name = %s\n", stu.man.name);
    	printf("addr = %s\n", stu.addr);
    
    	return 0;
    }
    ```

### 9.5 结构体赋值

* 相同类型的两个结构体变量，可以相互赋值，但还是没有关系的两个变量

    ```c
    #include<stdio.h>
    #include<string.h>
    
    //结构体类型的定义
    struct stu
    {
    	char name[50];
    	int age;
    };
    
    int main()
    {
    	struct stu s1;
    
    	//如果是普通变量，通过点运算符操作结构体成员
    	strcpy(s1.name, "abc");
    	s1.age = 18;
    	printf("s1.name = %s, s1.age = %d\n", s1.name, s1.age);
    
    	//把s1成员变量的值拷贝给s2成员变量的内存
    	struct stu s2 = s1;
    	//memcpy(&s2, &s1, sizeof(s1));
    	printf("s2.name = %s, s2.age = %d\n", s2.name, s2.age);
    
    	return 0;
    }
    ```

### 9.6 结构体做函数参数

* 传址与传值

    * 传址，结构体指针变量做函数参数， 将结构体的地址值做实参拷贝一份给形参，形参、实参共 1 份结构体
    * 传值，结构体变量做函数参数，将结构体变量的值(实参)，拷贝一份给形参，形参、实参共 2 份结构体
    * 结构体做函数参数、返回值时，通常采用 “传址” 方式，节省空间

    ```c
    void func08(struct student **m)
    {
    	*m = malloc(sizeof(struct student));
    	if (NULL == *m)
    	{
    		printf("malloc error\n");
    		return -1;
    	}
    	//p->age = 100;
    	//p->num = 1;
    	//strcpy(p->name, "zyx");
    	(*m)->age = 100;
    	(*m)->num = 1;
    	strcpy((*m)->name, "zyx");
    }
    
    int main(void)
    {
    	struct student* p = NULL;  // 空指针
    
    	func08(&p);
    
    	printf("age=%d, name=%s, num=%d\n", p->age, p->name, p->num);
    
    	free(p);
    	p = NULL;
    
    	return 0;
    }
    ```

### 9.7 结构体含有指针成员

* 申请内存：先申请外层空间，再申请内层空间

* 释放内存：先释放内存空间，在释放外层空间

    ```c
    struct student {
    	int age;
    	int num;
    	char *name;   // 野指针。 
    };
    
    int main(void)
    {
    	struct student* p;  //野指针。
    
    	// 给 p 初始化堆空间
    	p = malloc(sizeof(struct student));
    	if (NULL == p)
    	{
    		printf("malloc p error\n");
    		return -1;
    	}
    	// 给成员变量 name 开辟堆空间
    	p->name = malloc(sizeof(char) * 100);
    	if (NULL == p->name)
    	{
    		printf("malloc p->name error\n");
    		return -1;
    	}
    	// 写数据到结构体中
    	p->age = 100;
    	p->num = 10;
    	strcpy(p->name, "张三丰");
    
    	printf("age=%d, name=%s, num=%d\n", p->age, p->name, p->num);
        
    	// 先释放内层空间
    	free(p->name);
    	p->name = NULL;
        
    	free(p);
    	p = NULL;
    
    	return 0;
    }
    ```

### 9.8 typedef关键字

* 给现有的数据类型自定义名字

    * 通常使用 typedef 定义过的类型，添加一个 “_t” 结尾

    ```c
    typedef  unsigned int   size_t;  // 给 unsigned int 自定义名叫 size_t
    
    int a;  a 是变量名
    typedef int a;   a 变成了类型名
    ```

* 定义语法：

    - typedef 旧类型名  新类型名_t ;

```c
typedef struct student {
	int age;
	int num;
	char *name;   // 野指针。 
} stu_t;			// 新类型名：stu_t;
// 定义变量
struct student stu1;  // 依然可以正常使用
stu_t stu2;  // 定义一个 struct student 类型的变量stu2
```

- 使用 typedef 的好处

    * 简化类型名
    * 便于代码的修改和维护

    ```c
    typedef long long int32_t;   // int 《----》 long long
    
    struct student {
    	int age;
    	int32_t num;
    	char *name;   // 野指针
     	int32_t num1;
        int32_t num2;
        int32_t num3;
        int32_t num4;
    } stu_t;
    ```

### 9.9 联合体（共用体）

* 语法

    ```c
    union test {
        char ch;
        short sh;
        int var;
    };		// 创建一个联合体类型
    ```

* 特性

    * 内部所有成员变量的地址一致，等同于整个联合体的地址
    * 联合体的大小，是内部成员变量中，最大的那个成员的大小（对齐）
    * 修改其中一个成员的值，其他成员的值也跟着变化

    ```c
    #include <stdio.h>
    
    typedef union test {
    	char ch;
    	short sh;
    	int var;
    } test_t;
    
    int main(void)
    {
    	test_t obj;
    
    	obj.var = 0x87654321;
    
    	printf("&obj	= %p\n", &obj);
    	printf("&obj.ch = %p\n", &obj.ch);
    	printf("&obj.sh = %p\n", &obj.sh);
    	printf("&obj.var= %p\n", &obj.var);
    
    	printf("sizeof(test_t) = %u\n", sizeof(test_t));
    
    	printf("var = %#x\n", obj.var);
    	printf("sh = %#x\n", obj.sh);
    	printf("ch = %#x\n", obj.ch);
    
    	obj.ch = 0xAA;
    
    	printf("var = %#x\n", obj.var);
    	printf("sh = %#x\n", obj.sh);
    	printf("ch = %#x\n", obj.ch);
    
    	return 0;
    }
    
    ```

    

