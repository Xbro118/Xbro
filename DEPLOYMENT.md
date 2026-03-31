# 阿里云 OSS + CDN 部署指南

## 📋 前置准备

### 1. 阿里云账号准备
- 已注册阿里云账号
- 已购买域名（或准备使用阿里云域名）

### 2. 安装依赖
```bash
npm install
```

## 🔧 配置步骤

### 步骤 1: 获取阿里云 AccessKey

1. 登录阿里云控制台
2. 进入「访问控制 RAM」→「用户」→「创建用户」
3. 勾选「OpenAPI 访问」
4. 创建后保存 AccessKey ID 和 AccessKey Secret
5. 为用户添加权限策略：`AliyunOSSFullAccess`

### 步骤 2: 创建 OSS 存储桶

1. 登录阿里云控制台 → 对象存储 OSS
2. 点击「创建存储桶」
3. 配置参数：
   - **Bucket 名称**: 输入唯一的存储桶名称（如：`your-travel-website`）
   - **地域**: 选择离用户最近的地域（推荐：华东1-杭州）
   - **存储类型**: 标准存储
   - **读写权限**: 公共读
4. 点击「确定」创建

### 步骤 3: 配置部署文件

编辑 `deploy.config.json` 文件：

```json
{
  "accessKeyId": "你的AccessKey ID",
  "accessKeySecret": "你的AccessKey Secret",
  "region": "oss-cn-hangzhou",
  "bucket": "你的存储桶名称",
  "uploadPath": "dist/",
  "deleteBeforeUpload": true,
  "ignore": [
    ".DS_Store",
    "Thumbs.db"
  ]
}
```

**参数说明：**
- `accessKeyId`: 阿里云 AccessKey ID
- `accessKeySecret`: 阿里云 AccessKey Secret
- `region`: OSS 区域（如：`oss-cn-hangzhou`、`oss-cn-beijing`）
- `bucket`: 存储桶名称
- `uploadPath`: 本地构建产物目录
- `deleteBeforeUpload`: 上传前是否删除旧文件
- `ignore`: 忽略上传的文件

### 步骤 4: 部署项目

```bash
npm run deploy
```

部署脚本会自动：
1. 构建项目（`npm run build`）
2. 删除 OSS 中的旧文件（如果配置了 `deleteBeforeUpload: true`）
3. 上传新文件到 OSS
4. 显示访问地址

## 🌐 域名配置

### 步骤 5: 绑定自定义域名

1. 在 OSS 控制台 → 选择存储桶 →「域名管理」
2. 点击「绑定用户域名」
3. 输入您的专属域名（如：`www.yourdomain.com`）
4. 点击「提交」
5. 记录显示的 CNAME 地址（如：`your-bucket.oss-cn-hangzhou.aliyuncs.com`）

### 步骤 6: 配置域名解析

1. 登录阿里云域名控制台
2. 找到您的域名 →「解析设置」
3. 添加记录：
   - **记录类型**: CNAME
   - **主机记录**: `www`（或 `@` 表示根域名）
   - **记录值**: OSS 提供的 CNAME 地址
4. 保存并等待 DNS 生效（通常 10-60 分钟）

## 🚀 开启 CDN 加速

### 步骤 7: 配置 CDN

1. 在 OSS 控制台 →「域名管理」→ 找到您的域名
2. 点击「开启 CDN 加速」
3. 选择合适的计费方式（推荐：按流量计费）
4. 配置缓存规则：
   - HTML 文件：不缓存
   - CSS/JS/图片：缓存 1 年
5. 确认开启

## 🔒 配置 HTTPS 证书

### 步骤 8: 申请免费 SSL 证书

1. 在 OSS 控制台 →「域名管理」→ 找到您的域名
2. 点击「配置证书」
3. 选择「免费证书」
4. 按照提示完成域名验证
5. 等待证书签发（通常 1-5 分钟）

### 步骤 9: 启用 HTTPS

1. 证书签发后，点击「启用 HTTPS」
2. 选择已签发的证书
3. 配置 HTTP 自动跳转 HTTPS
4. 保存配置

## 📊 验证部署

### 访问测试
```bash
# 测试 HTTP 访问
curl -I http://www.yourdomain.com

# 测试 HTTPS 访问
curl -I https://www.yourdomain.com
```

### 检查清单
- [ ] 域名可以正常访问
- [ ] HTTPS 证书正常
- [ ] 页面加载速度正常
- [ ] 图片和静态资源正常加载
- [ ] 路由跳转正常

## 🔄 更新部署

当您修改代码后，只需重新运行部署命令：

```bash
npm run deploy
```

## 🛠️ 常见问题

### 1. 上传失败
**问题**: 提示权限不足
**解决**: 检查 AccessKey 权限，确保有 `AliyunOSSFullAccess` 权限

### 2. 域名无法访问
**问题**: 域名解析未生效
**解决**: 
- 检查 DNS 解析是否正确
- 使用 `nslookup` 或 `dig` 命令检查解析
- 等待 DNS 生效（最多 48 小时）

### 3. HTTPS 证书验证失败
**问题**: 域名验证失败
**解决**:
- 确保域名已正确解析到 OSS
- 检查 DNS 记录是否正确
- 等待 DNS 生效后重新申请

### 4. 静态资源 404
**问题**: 图片或 CSS 文件无法加载
**解决**:
- 检查文件路径是否正确
- 确认文件已成功上传到 OSS
- 检查 OSS 存储桶权限设置

## 💰 成本估算

### OSS 存储费用
- 标准存储：约 ¥0.12/GB/月
- 假设项目大小 100MB：约 ¥0.012/月

### CDN 流量费用
- 按流量计费：约 ¥0.24/GB
- 假设月访问量 100GB：约 ¥24/月

### HTTPS 证书
- 免费证书：¥0/年

**总计**: 约 ¥24-30/月（中等流量）

## 📞 技术支持

如有问题，请联系：
- 阿里云 OSS 文档：https://help.aliyun.com/product/31815.html
- 阿里云 CDN 文档：https://help.aliyun.com/product/27107.html
- 阿里云工单系统：https://workorder.console.aliyun.com/

## 🎉 完成

恭喜！您的项目已成功部署到阿里云 OSS + CDN，并绑定了专属域名。

现在可以通过您的专属域名访问项目了！