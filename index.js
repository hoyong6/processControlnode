/**
 * 实际上我有这样几个分支支线，一个总线，分支支线是一个顺序流程，1，2，3，4。然而 1，2，3，4 分别可能是异步程序，
 * 我该如何有效的控制这个循环流程，然后代码看着稍微优雅一些，且实际可用。
 * 这样不行啊，按照这种思路来讲我们再一次把代码写出了死循环。
 * 第一个 promise 异步回调完成，马上就会回调启动第二个函数，而且我这边还没有任何的思路。
 * 除非我不用异步，但是我想用异步。 串联4个小任务，然后是多个大任务并联。总体是一个串并联模型
 */
class ProgramBus { // 程序总线
  constructor() {
    this.feederLine()
  }
  feederLine(config, data) { // 真正的总线
    if(!config || !data){
      return false
    }
    this.feederLine1(config, data)
  }
  async feederLine1(config, data) {
    console.log('feederLine1')
    await this.feederLine2(config, data)         
  }
  async feederLine2(config, data) {
    console.log('feederLine2')
    await this.feederLine3(config, data)
  }
  async feederLine3(config, data) {
    console.log('feederLine3')
    await this.feederLine4(config, data)
  }
  async feederLine4(config, data) {
    console.log('feederLine4')
    console.log(config, data)
  }
}

async function allBus() {
  let a = await new ProgramBus
  a.feederLine('www','1')
  console.log('查看输出的异步-->', a)
  let b = await new ProgramBus
  b.feederLine('www','2')
  console.log('查看输出的异步-->', b)
}

allBus()
// export default programBus