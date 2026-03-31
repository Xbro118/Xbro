const OSS = require('ali-oss');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const config = require('./deploy.config.json');

const client = new OSS({
  region: config.region,
  accessKeyId: config.accessKeyId,
  accessKeySecret: config.accessKeySecret,
  bucket: config.bucket,
});

async function uploadFile(localPath, ossPath) {
  try {
    const result = await client.put(ossPath, localPath);
    console.log(`✓ 上传成功: ${ossPath}`);
    return result;
  } catch (error) {
    console.error(`✗ 上传失败: ${ossPath}`, error.message);
    throw error;
  }
}

async function uploadDirectory(dir, ossBasePath) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const localPath = path.join(dir, file);
    const stat = fs.statSync(localPath);
    
    if (stat.isDirectory()) {
      await uploadDirectory(localPath, `${ossBasePath}${file}/`);
    } else {
      if (config.ignore.includes(file)) {
        console.log(`⊘ 跳过: ${file}`);
        continue;
      }
      await uploadFile(localPath, `${ossBasePath}${file}`);
    }
  }
}

async function deleteOSSFiles(ossPath) {
  try {
    const result = await client.list({
      prefix: ossPath,
    });
    
    if (result.objects && result.objects.length > 0) {
      const objects = result.objects.map(obj => obj.name);
      await client.deleteMulti(objects);
      console.log(`✓ 已删除 ${objects.length} 个旧文件`);
    }
  } catch (error) {
    console.error('删除旧文件失败:', error.message);
  }
}

async function deploy() {
  console.log('🚀 开始部署到阿里云 OSS...\n');
  
  try {
    console.log('📦 1. 构建项目...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✓ 构建完成\n');
    
    const distPath = path.resolve(config.uploadPath);
    const ossPath = '';
    
    if (config.deleteBeforeUpload) {
      console.log('🗑️  2. 清理旧文件...');
      await deleteOSSFiles(ossPath);
      console.log('');
    }
    
    console.log('📤 3. 上传文件到 OSS...');
    await uploadDirectory(distPath, ossPath);
    console.log('');
    
    console.log('✅ 部署完成！');
    console.log(`\n🌐 访问地址: https://${config.bucket}.${config.region}.aliyuncs.com`);
    console.log(`\n📝 下一步:`);
    console.log(`   1. 登录阿里云 OSS 控制台`);
    console.log(`   2. 在域名管理中绑定您的专属域名`);
    console.log(`   3. 配置 CNAME 记录指向 OSS 域名`);
    console.log(`   4. 开启 CDN 加速和 HTTPS 证书\n`);
    
  } catch (error) {
    console.error('\n❌ 部署失败:', error.message);
    process.exit(1);
  }
}

deploy();